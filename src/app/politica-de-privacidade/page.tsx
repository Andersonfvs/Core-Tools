import React from "react";
import type { Metadata } from "next";
import AdSenseBanner from "@/components/AdSenseBanner";

export const metadata: Metadata = {
  title: "Política de Privacidade - CoreTools // Utilities",
  description:
    "Política de privacidade do CoreTools Utilities. Conheça as políticas de cookies, privacidade e o processamento local (client-side) dos nossos utilitários.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="flex-grow max-w-3xl mx-auto px-6 py-12 font-mono text-xs text-brand-muted leading-relaxed w-full">
      {/* Mirror corners decoration */}
      <div className="relative border border-brand-border p-8 bg-brand-panel/20">
        <span className="absolute top-1 left-2 text-zinc-700 select-none">[Privacy Policy]</span>
        <span className="absolute bottom-1 right-2 text-zinc-700 select-none">[v1.0]</span>

        <h1 className="font-sans text-2xl font-black text-brand-text uppercase mb-6 tracking-wide">
          Política de Privacidade
        </h1>
        
        <p className="text-zinc-400 mb-6 text-sm">
          Última atualização: 19 de Julho de 2026.
        </p>

        <div className="space-y-6">
          <section>
            <h2 className="font-sans text-sm font-bold text-brand-text uppercase tracking-wider mb-2 border-b border-brand-border pb-1">
              1. Processamento Local (Client-Side)
            </h2>
            <p>
              O <strong>CoreTools // Utilities</strong> foi desenvolvido sob o princípio da privacidade por padrão (*privacy by design*). Todos os utilitários disponíveis no site — incluindo o Conversor WebP e os descompactadores ZIP e RAR — processam dados exclusivamente no seu dispositivo (computador, tablet ou celular). 
            </p>
            <p className="mt-2 font-bold text-brand-accent">
              Nenhum arquivo enviado por você é transmitido, armazenado, copiado ou analisado em nossos servidores. O processamento binário ocorre inteiramente na memória RAM do seu próprio navegador.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-sm font-bold text-brand-text uppercase tracking-wider mb-2 border-b border-brand-border pb-1">
              2. Cookies e Identificadores do Google AdSense
            </h2>
            <p>
              Utilizamos o Google AdSense para exibir anúncios em nosso site. O Google, como fornecedor terceiro, utiliza cookies para veicular anúncios com base nas suas visitas anteriores a este ou a outros sites na Internet.
            </p>
            <p className="mt-2">
              Com o uso do cookie DoubleClick, o Google e seus parceiros podem veicular anúncios direcionados com base nos seus interesses. Você pode optar por desativar a publicidade personalizada visitando as Configurações de Anúncios do Google.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-sm font-bold text-brand-text uppercase tracking-wider mb-2 border-b border-brand-border pb-1">
              3. Logs de Servidor e Análise Anônima
            </h2>
            <p>
              Nosso servidor de hospedagem pode coletar dados de log básicos e anônimos (como volume de tráfego, número de visitas e tipo de navegador) com o objetivo exclusivo de garantir a segurança técnica, a estabilidade e a integridade da plataforma. Não rastreamos informações pessoais dos usuários nem utilizamos cookies analíticos invasivos.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-sm font-bold text-brand-text uppercase tracking-wider mb-2 border-b border-brand-border pb-1">
              4. Consentimento e Alterações
            </h2>
            <p>
              Ao utilizar nossas ferramentas, você concorda com os termos dispostos nesta Política de Privacidade. Reservamo-nos o direito de alterar este documento a qualquer momento. Quaisquer modificações futuras serão publicadas nesta página com a respectiva data de atualização.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-sm font-bold text-brand-text uppercase tracking-wider mb-2 border-b border-brand-border pb-1">
              5. Contato
            </h2>
            <p>
              Se você tiver dúvidas sobre nossa política ou sobre as práticas locais do site, entre em contato pelo email:  
              <span className="text-brand-accent font-semibold ml-1">contato@fvsynapse.com.br</span>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
