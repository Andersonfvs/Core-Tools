"use client";

import React, { useState } from "react";

// Chave do Web3Forms. Enquanto nao estiver configurada (via NEXT_PUBLIC_WEB3FORMS_KEY),
// o formulario e ocultado e exibimos apenas o e-mail direto — evitando um form "fantasma"
// que aceita envios mas nao entrega nada (bloqueador de revisao do AdSense).
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
const FORM_ENABLED = Boolean(WEB3FORMS_KEY && !WEB3FORMS_KEY.includes("YOUR_ACCESS_KEY"));

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMsg("ERRO // CAMPO_OBRIGATORIO_VAZIO");
      return;
    }

    setSent(true);
    setErrorMsg("");
    setSuccess(false);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: formData.name,
          email: formData.email,
          subject: formData.subject || "Contato - CoreTools",
          message: formData.message,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setSuccess(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setErrorMsg("ERRO // FALHA_NO_ENVIO: " + (result.message || "Erro de chave de acesso ou servidor"));
      }
    } catch (err) {
      setErrorMsg("ERRO // FALHA_CONEXAO_REDE");
    } finally {
      setSent(false);
    }
  };

  return (
    <main className="flex-grow max-w-2xl mx-auto px-6 py-12 font-mono text-xs text-brand-muted leading-relaxed w-full">
      <div className="relative border border-brand-border p-8 bg-brand-panel/20">
        <span className="absolute top-1 left-2 text-zinc-700 select-none">[Contact]</span>
        <span className="absolute bottom-1 right-2 text-zinc-700 select-none">[Form]</span>

        <h1 className="font-sans text-2xl font-black text-brand-text uppercase mb-2 tracking-wide">
          Fale Conosco
        </h1>
        <p className="text-zinc-500 mb-6">
          {FORM_ENABLED
            ? "Dúvidas, sugestões ou suporte técnico? Preencha o formulário abaixo."
            : "Dúvidas, sugestões ou suporte técnico? Fale com a gente pelo e-mail abaixo."}
        </p>

        {/* Inline Feedback Alerts instead of ugly browser popups */}
        {FORM_ENABLED && success && (
          <div className="mb-6 p-4 border border-brand-accent bg-brand-accent/5 text-brand-accent animate-flicker">
            <span className="block font-bold uppercase mb-1">STATUS: TRANSMISSION_OK // MESSAGE_RECEIVED</span>
            <p className="text-[10px] text-zinc-400">
              Sua mensagem foi enviada com sucesso para o nosso canal de suporte. Responderemos em breve.
            </p>
          </div>
        )}

        {FORM_ENABLED && errorMsg && (
          <div className="mb-6 p-4 border border-red-500/50 bg-red-500/5 text-red-400 font-bold uppercase">
            {errorMsg}
          </div>
        )}

        {FORM_ENABLED && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-zinc-400 uppercase text-[9px] mb-1.5 font-bold">
              Nome Completo *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-black border border-brand-border px-3 py-2 text-brand-text focus:outline-none focus:border-brand-accent rounded-none"
              placeholder="Seu nome"
            />
          </div>

          <div>
            <label className="block text-zinc-400 uppercase text-[9px] mb-1.5 font-bold">
              Endereço de E-mail *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-black border border-brand-border px-3 py-2 text-brand-text focus:outline-none focus:border-brand-accent rounded-none"
              placeholder="seu.email@provedor.com"
            />
          </div>

          <div>
            <label className="block text-zinc-400 uppercase text-[9px] mb-1.5 font-bold">
              Assunto
            </label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full bg-black border border-brand-border px-3 py-2 text-brand-text focus:outline-none focus:border-brand-accent rounded-none"
              placeholder="Ex: Sugestão de utilitário"
            />
          </div>

          <div>
            <label className="block text-zinc-400 uppercase text-[9px] mb-1.5 font-bold">
              Mensagem *
            </label>
            <textarea
              required
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-black border border-brand-border px-3 py-2 text-brand-text focus:outline-none focus:border-brand-accent rounded-none resize-y"
              placeholder="Digite sua mensagem aqui..."
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={sent}
              className="w-full py-2.5 btn-tactile-accent uppercase text-xs tracking-wider font-bold cursor-pointer disabled:opacity-50"
            >
              {sent ? "Transmitindo..." : "Enviar Mensagem"}
            </button>
          </div>
        </form>
        )}

        <div className="mt-8 border-t border-brand-border/60 pt-6 text-[10px] text-zinc-500">
          <span className="block uppercase text-zinc-600 mb-1">Contato direto via e-mail:</span>
          <a
            href="mailto:contato@fvsynapse.com.br"
            className="text-brand-accent font-bold hover:underline"
          >
            contato@fvsynapse.com.br
          </a>
        </div>
      </div>
    </main>
  );
}
