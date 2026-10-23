import type { Metadata } from "next";
import { Providers } from "@/components/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Navoiy viloyati sanoat zonalarini boshqarish direksiyasi",
    template: "%s · NSZBD.UZ",
  },
  description:
    "Navoiy viloyatidagi kichik va yoshlar sanoat zonalarini boshqarish, investitsiyalarni jalb qilish va ishlab chiqaruvchilarni qo‘llab-quvvatlash davlat muassasasi rasmiy veb-sayti.",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uz"
      suppressHydrationWarning
      className="h-full font-sans"
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function cleanExtensionNodes() {
                  var badIds = ['scrnli_recorder_root'];
                  for (var i = 0; i < badIds.length; i++) {
                    var el = document.getElementById(badIds[i]);
                    if (el && el.parentNode) {
                      el.parentNode.removeChild(el);
                    }
                  }
                }
                cleanExtensionNodes();
                if (typeof MutationObserver !== 'undefined') {
                  new MutationObserver(function(mutations) {
                    for (var i = 0; i < mutations.length; i++) {
                      var added = mutations[i].addedNodes;
                      for (var j = 0; j < added.length; j++) {
                        var node = added[j];
                        if (node && node.nodeType === 1 && (node.id === 'scrnli_recorder_root' || (node.id && node.id.indexOf('scrnli') !== -1))) {
                          node.remove();
                        }
                      }
                    }
                  }).observe(document.documentElement, { childList: true, subtree: true });
                }
              })();
            `,
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-full font-sans antialiased bg-[#EEEEEE] dark:bg-[#010c22] text-[#010c22] dark:text-[#F3F4F6] transition-colors duration-200"
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
