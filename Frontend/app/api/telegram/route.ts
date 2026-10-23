import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, phone, email, message, source = "Saytdan ariza" } = body;

    if (!fullName || !phone) {
      return NextResponse.json(
        { error: "Ism va telefon raqami kiritilishi shart" },
        { status: 400 },
      );
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    const now = new Date();
    const formattedDate = new Intl.DateTimeFormat("uz-UZ", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Tashkent",
    }).format(now);

    const text = `🔔 <b>YANGI ARIZA / MUROJAAT</b>\n` +
      `────────────────────\n` +
      `👤 <b>F.I.Sh:</b> ${escapeHtml(fullName)}\n` +
      `📞 <b>Telefon:</b> <code>${escapeHtml(phone)}</code>\n` +
      `📧 <b>Email:</b> ${email ? escapeHtml(email) : "<i>Kiritilmagan</i>"}\n` +
      `📍 <b>Bo'lim:</b> ${escapeHtml(source)}\n` +
      `⏰ <b>Vaqt:</b> ${formattedDate}\n` +
      `────────────────────\n` +
      `💬 <b>Loyiha / Xabar:</b>\n` +
      `${message ? escapeHtml(message) : "<i>Qo'shimcha matn yo'q</i>"}`;

    // If Telegram credentials are provided, send via Telegram Bot API
    if (botToken && chatId) {
      const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
      const res = await fetch(telegramUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        console.error("Telegram API error:", data);
        return NextResponse.json(
          { error: "Telegram botga yuborishda xatolik yuz berdi", details: data },
          { status: 502 },
        );
      }
    } else {
      // In development or when tokens are not yet filled, log to console
      console.log("=== [TELEGRAM FORWARD SIMULATION] ===");
      console.log(text.replace(/<[^>]+>/g, ""));
      console.log("Set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in .env to deliver live messages.");
      console.log("=====================================");
    }

    return NextResponse.json({
      success: true,
      message: "Arizangiz muvaffaqiyatli qabul qilindi",
    });
  } catch (error) {
    console.error("Apply API Error:", error);
    return NextResponse.json(
      { error: "Serverda xatolik yuz berdi" },
      { status: 500 },
    );
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
