import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos de Uso - CoreTools // Utilities",
  description:
    "Termos de uso do portal CoreTools Utilities. Conheça as regras de uso livre e isenções de responsabilidade de processamento local.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsOfUsePage() {
  return (
    <main className="flex-grow max-w-3xl mx-auto px-6 py-12 font-mono text-xs text-brand-muted leading-relaxed w-full">
      <div className="relative border border-brand-border p-8 bg-brand-panel/20">
        <span className="absolute top-1 left-2 text-zinc-700 select-none">[Terms of Use]</span>
        <span className="absolute bottom-1 right-2 text-zinc-700 select-none">[v1.0]</span>

        <h1 className="font-sans text-2xl font-black text-brand-text uppercase mb-6 tracking-wide">
          Termos de Uso
        </h1>
        
        <p className="text-zinc-400 mb-6 text-sm">
          Última atualização: 19 de Julho de 2026.
        </p>

        <div className="space-y-6">
          <section>
            <h2 className="font-sans text-sm font-bold text-brand-text uppercase tracking-wider mb-2 border-b border-brand-border pb-1">
              1. Aceitação dos Termos
            </h2>
            <p>
              Ao acessar e utilizar o portal <strong>CoreTools // Utilities</strong>, você concorda em cumprir e estar vinculado aos seguintes Termos de Uso. Caso não concorde com qualquer parte destes termos, você não deve utilizar nossas ferramentas.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-sm font-bold text-brand-text uppercase tracking-wider mb-2 border-b border-brand-border pb-1">
              2. Licença e Uso Gratuito
            </h2>
            <p>
              Nossos utilitários são oferecidos de forma totalmente gratuita e livre, tanto para fins pessoais quanto comerciais. Não há necessidade de cadastro ou pagamento para utilizar os conversores e descompactadores locais. 
            </p>
          </section>

          <section>
            <h2 className="font-sans text-sm font-bold text-brand-text uppercase tracking-wider mb-2 border-b border-brand-border pb-1">
              3. Processamento Local e Garantias
            </h2>
            <p>
              Como o processamento dos arquivos é efetuado inteiramente no navegador do usuário (Client-Side), a velocidade e a eficiência técnica dependem do hardware e da memória RAM de seu próprio dispositivo. 
            </p>
            <p className="mt-2">
              O serviço é fornecido &quot;no estado em que se encontra&quot; (*as is*), sem garantias de qualquer tipo, expressas ou implícitas. Não nos responsabilizamos por perdas de dados, erros de conversão ou arquivos corrompidos que ocorram devido a limitações técnicas do seu navegador ou dispositivo.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-sm font-bold text-brand-text uppercase tracking-wider mb-2 border-b border-brand-border pb-1">
              4. Alterações e Disponibilidade
            </h2>
            <p>
              Reservamo-nos o direito de alterar, suspender ou descontinuar qualquer ferramenta ou funcionalidade a qualquer momento, sem aviso prévio. Não garantimos que a plataforma estará disponível ininterruptamente ou livre de bugs.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-sm font-bold text-brand-text uppercase tracking-wider mb-2 border-b border-brand-border pb-1">
              5. Lei Aplicável
            </h2>
            <p>
              Estes termos são regidos pelas leis da República Federativa do Brasil. Qualquer disputa em relação ao uso do site deverá ser resolvida no foro da comarca correspondente, de acordo com a legislação aplicável.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
