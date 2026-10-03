import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  LogOut,
  Mail,
  Loader2,
  MessageCircle,
  Image as ImageIcon,
  ChevronRight,
  Inbox,
} from "lucide-react";
import { supabase } from "@/lib/supabaseAdminClient";

const ADMIN_EMAIL = "mirandagyelyag@gmail.com";

function formatDate(value) {
  if (!value) return "";
  return new Intl.DateTimeFormat("es-CL", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default function AdminConversations() {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState(ADMIN_EMAIL);
  const [sent, setSent] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [loadingData, setLoadingData] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setSession(data.session || null);
      setLoadingAuth(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession || null);
      setLoadingAuth(false);
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!session?.user?.email) return;
    if (session.user.email !== ADMIN_EMAIL) {
      setError("Este correo no tiene acceso al panel.");
      return;
    }
    loadConversations();
  }, [session]);

  const loadConversations = async () => {
    setLoadingData(true);
    setError("");

    const { data, error: conversationsError } = await supabase
      .from("maderas_assistant_conversations")
      .select("id, started_at, last_message_at")
      .order("last_message_at", { ascending: false });

    if (conversationsError) {
      setError("No pude cargar las conversaciones.");
      setLoadingData(false);
      return;
    }

    const ids = (data || []).map((row) => row.id);
    let latestMap = {};

    if (ids.length) {
      const { data: messageRows } = await supabase
        .from("maderas_assistant_messages")
        .select("conversation_id, role, content, created_at")
        .in("conversation_id", ids)
        .order("created_at", { ascending: false });

      for (const row of messageRows || []) {
        if (!latestMap[row.conversation_id]) latestMap[row.conversation_id] = row;
      }
    }

    const enriched = (data || []).map((row) => ({
      ...row,
      latest: latestMap[row.id] || null,
    }));

    setConversations(enriched);
    if (!selectedId && enriched[0]) setSelectedId(enriched[0].id);
    setLoadingData(false);
  };

  useEffect(() => {
    if (!selectedId || !session) return;
    loadMessages(selectedId);
  }, [selectedId, session]);

  const loadMessages = async (conversationId) => {
    setMessages([]);
    const { data, error: messagesError } = await supabase
      .from("maderas_assistant_messages")
      .select("id, role, content, image_path, created_at")
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true });

    if (messagesError) {
      setError("No pude abrir esta conversación.");
      return;
    }

    const withImages = await Promise.all(
      (data || []).map(async (row) => {
        if (!row.image_path) return row;

        const { data: signed } = await supabase.storage
          .from("maderas-assistant-uploads")
          .createSignedUrl(row.image_path, 60 * 30);

        return { ...row, imageUrl: signed?.signedUrl || "" };
      })
    );

    setMessages(withImages);
  };

  const visibleConversations = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return conversations;

    return conversations.filter((conversation) => {
      const haystack = [
        conversation.latest?.content || "",
        formatDate(conversation.last_message_at),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(query);
    });
  }, [conversations, search]);

  const sendMagicLink = async (e) => {
    e.preventDefault();
    setError("");
    setSent(false);

    if (email.trim().toLowerCase() !== ADMIN_EMAIL) {
      setError("Ese correo no está autorizado.");
      return;
    }

    const { error: authError } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        emailRedirectTo: `${window.location.origin}/admin`,
      },
    });

    if (authError) {
      setError("No pude enviar el enlace de acceso.");
      return;
    }

    setSent(true);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setConversations([]);
    setMessages([]);
    setSelectedId(null);
  };

  if (loadingAuth) {
    return (
      <div className="min-h-screen bg-[#171411] text-[#F9F7F2] flex items-center justify-center">
        <Loader2 className="animate-spin text-[#B88655]" size={28} />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-[#171411] text-[#F9F7F2] flex items-center justify-center px-5">
        <div className="w-full max-w-md border border-[#A67C52]/35 bg-[#211C18] p-7 sm:p-8 shadow-2xl">
          <div className="w-12 h-12 rounded-full bg-[#A67C52]/15 border border-[#A67C52]/35 flex items-center justify-center mb-5">
            <Mail size={22} className="text-[#C99561]" />
          </div>

          <p className="font-mono-tech text-[10px] uppercase tracking-[0.18em] text-[#A67C52] mb-2">
            Panel privado
          </p>
          <h1 className="font-heading text-3xl font-bold leading-tight">
            Conversaciones del asistente
          </h1>
          <p className="text-[#F9F7F2]/55 text-sm leading-relaxed mt-3">
            Entra con el correo autorizado. Te enviaremos un enlace seguro.
          </p>

          <form onSubmit={sendMagicLink} className="mt-7 space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#171411] border border-[#A67C52]/30 px-4 py-3 text-sm outline-none focus:border-[#A67C52]"
              placeholder="tu@email.com"
            />
            <button
              type="submit"
              className="w-full bg-[#B88655] hover:bg-[#9C7048] transition-colors px-4 py-3.5 font-heading font-semibold text-sm"
            >
              ENVIAR ENLACE DE ACCESO
            </button>
          </form>

          {sent && (
            <p className="mt-4 text-sm text-[#D9C2A6]">
              Revisa tu correo. El enlace te traerá de vuelta a este panel.
            </p>
          )}

          {error && <p className="mt-4 text-sm text-red-300">{error}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#171411] text-[#F9F7F2]">
      <header className="border-b border-[#A67C52]/28 bg-[#1E1A17]">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 py-4 flex items-center justify-between gap-4">
          <div>
            <p className="font-mono-tech text-[9px] uppercase tracking-[0.18em] text-[#A67C52]">
              Maderas M&M
            </p>
            <h1 className="font-heading text-xl sm:text-2xl font-bold">
              Conversaciones del asistente
            </h1>
          </div>

          <button
            onClick={signOut}
            className="inline-flex items-center gap-2 border border-[#A67C52]/30 px-3 py-2 text-xs text-[#F9F7F2]/70 hover:text-white hover:border-[#A67C52] transition-colors"
          >
            <LogOut size={15} />
            Salir
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-5 sm:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] border border-[#A67C52]/25 min-h-[72vh] bg-[#1D1916]">
          <aside className="border-b lg:border-b-0 lg:border-r border-[#A67C52]/25">
            <div className="p-4 border-b border-[#A67C52]/20">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A67C52]" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar conversación..."
                  className="w-full bg-[#171411] border border-[#A67C52]/25 pl-9 pr-3 py-2.5 text-sm outline-none focus:border-[#A67C52]"
                />
              </div>
            </div>

            <div className="max-h-[64vh] overflow-y-auto">
              {loadingData ? (
                <div className="p-8 flex justify-center">
                  <Loader2 className="animate-spin text-[#A67C52]" />
                </div>
              ) : visibleConversations.length === 0 ? (
                <div className="p-8 text-center text-[#F9F7F2]/45">
                  <Inbox size={28} className="mx-auto mb-3 text-[#A67C52]/70" />
                  <p className="text-sm">Todavía no hay conversaciones.</p>
                </div>
              ) : (
                visibleConversations.map((conversation) => (
                  <button
                    key={conversation.id}
                    onClick={() => setSelectedId(conversation.id)}
                    className={`w-full text-left p-4 border-b border-[#A67C52]/15 transition-colors ${
                      selectedId === conversation.id
                        ? "bg-[#2B241E]"
                        : "hover:bg-[#241F1B]"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#A67C52]/15 border border-[#A67C52]/25 flex items-center justify-center shrink-0">
                        <MessageCircle size={16} className="text-[#C99561]" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold truncate">
                          {conversation.latest?.content || "Nueva conversación"}
                        </p>
                        <p className="text-[11px] text-[#F9F7F2]/40 mt-1">
                          {formatDate(conversation.last_message_at)}
                        </p>
                      </div>
                      <ChevronRight size={15} className="text-[#A67C52]/50 mt-1" />
                    </div>
                  </button>
                ))
              )}
            </div>
          </aside>

          <section className="min-h-[560px] flex flex-col">
            {!selectedId ? (
              <div className="flex-1 flex items-center justify-center text-[#F9F7F2]/40 text-sm">
                Selecciona una conversación.
              </div>
            ) : (
              <>
                <div className="px-5 py-4 border-b border-[#A67C52]/20">
                  <p className="font-mono-tech text-[9px] uppercase tracking-[0.16em] text-[#A67C52]">
                    Conversación
                  </p>
                  <p className="text-xs text-[#F9F7F2]/40 mt-1">
                    {selectedId}
                  </p>
                </div>

                <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 max-h-[64vh]">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[86%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                          message.role === "user"
                            ? "bg-[#A67C52] text-white rounded-br-sm"
                            : "bg-[#2B2723] border border-[#A67C52]/18 text-[#F9F7F2] rounded-bl-sm"
                        }`}
                      >
                        {message.imageUrl && (
                          <a href={message.imageUrl} target="_blank" rel="noopener noreferrer">
                            <img
                              src={message.imageUrl}
                              alt="Foto enviada"
                              className="mb-3 max-h-72 rounded-xl object-cover border border-black/10"
                            />
                          </a>
                        )}

                        <p>{message.content}</p>

                        <div className="mt-2 flex items-center gap-2 text-[10px] opacity-50">
                          {message.imageUrl && <ImageIcon size={12} />}
                          <span>{formatDate(message.created_at)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </section>
        </div>

        {error && (
          <p className="mt-4 text-sm text-red-300">{error}</p>
        )}
      </main>
    </div>
  );
}
