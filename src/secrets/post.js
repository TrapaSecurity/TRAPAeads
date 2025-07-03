import { useAuthStore } from '@/stores/auth'


export const TRAPAPOST = [
  {
    id: 2, likes: 3842,
    content: `🏃🏻‍➡️ 企業資安事件調查報告競賽 即將登場 🏃🏻‍➡️

就是明天！Cyber Range - 企業資安攻防實戰第二階段即將開始！已獲得實戰競賽邀請函的來賓，請準時於 4/17（四）09:00 攜帶邀請函至 ４ 樓 CYBERSEC ARENA 報到台登記參加！
此次評選與以往不同，晉級的來賓將延伸前兩日的演練結果，撰寫出事件調查報告 （IR Report），挑戰事件應變的匯報能力。
不僅如此，本次報告評選特邀企業資安長擔任評審，以決策者專業視角分享寶貴的實務經驗以協助參賽者掌握資安策略方向，深化對企業應變效率與資源配置的理解。
事件報告最終入選的五位參賽者，將可於下午的頒獎典禮獲得 7-11 購物金及 CYBERSEC 大會專屬限定好禮 ✨✨
凡全程參加競賽與頒獎典禮者也可獲得 200 元的 7-11 購物金，數量有限，送完為止！頒獎典禮特別開放給所有對資安領域有熱忱的朋友參與，無論是否參賽均可入場。歡迎所有對企業資安防禦策略、資安事件調查與應變有興趣的朋友前來交流，一同共襄盛舉 🏆！

🛡️ 階段二：實戰競賽 ── 企業資安事件調查報告競賽
時間：4/17（四）09:00 - 12:30
09:00 - 09:30 報到時間（請攜帶邀請函前來）
09:30 - 12:30 企業資安事件調查報告競賽
‼️ 參加實戰演練與實戰競賽敬請自備筆電
（筆電建議規格：記憶體超過 4G 以上，可正常連網，解析度 Full HD）

🏅 頒獎典禮時間：
時間： 4/17（四）15:30 - 16:50
15:30 - 15:40 典禮入場時間（開放非競賽者入內旁聽）
15:30 - 16:50 頒獎典禮

👉🏻 了解 TRAPA Cyber Range™ 平台：
https://trapa.tw/products/
👉🏻 了解更多關於 Cyber Range - 企業資安攻防實戰：
https://cybersec.ithome.com.tw/2025/cybersecArena
🚩 4/15、4/16、4/17 南港展覽館二館 1F ｜ P101 攤位
#CYBERSEC2025 #iThome #菱鏡 #TRAPA`,
    create_time: "2025-06-21T00:00:00.000Z",
    author_name: "TRAPA.Security"
  },
  {
    id: 1, likes: 5892,
    content: `🏅 TRAPA Security X iThome 資安競技場 面對真實資安威脅挑戰 🏅

Cyber Range 企業資安攻防實戰
無須事先報名、現場即刻體驗 🔥

在本次臺灣資安大會 4 樓「Cyber Range - 企業資安攻防實戰」活動中，參與者不僅可以親身體驗 TRAPA Cyber Range™ 藍隊演練平台的擬真資安攻防實戰，進行系統性的演練、了解情境中的資安威脅與攻擊情境，演練結束後更有專人進行演練劇本的重點剖析 📝，體驗如何透過演練提升資安洞悉及防禦能力 🛡️

💡 本次的活動採「二階段」進行：4/15（二）、4/16（三）的「階段一：實戰演練」開放自由參加，無需事先組隊報名，隨時可加入挑戰！參與者完成至少 8 道題目後，憑現場獲得的專屬帳號密碼函兌換實戰競賽邀請函，即可取得 4/17（四）「階段二：實戰競賽」的參賽資格！歡迎各方好手前來切磋挑戰！

想要強化企業防禦實力或提升個人技術，千萬不要錯過 Cyber Range 企業資安攻防實戰！

⚔️ 階段一：實戰演練資訊
時間：4/15 ( 二 ) ~ 4/16 ( 三 ) 12:00 - 17:00
　　　12:00 - 12:15 開場說明
　　　16:45 - 17:00 演練重點剖析
‼️ 參加實戰演練與實戰競賽敬請自備筆電
（筆電建議規格：記憶體超過 4G 以上，可正常連網，解析度 Full HD）

👉🏻 了解更多關於 Cyber Range - 企業資安攻防實戰：
https://cybersec.ithome.com.tw/2025/cybersecArena
👉🏻 了解 TRAPA Cyber Range™ 平台：
https://trapa.tw/products/
🚩 4/15、4/16、4/17 南港展覽館二館 1F ｜ P101 攤位
#CYBERSEC2025 #iThome #菱鏡 #TRAPA`,
    create_time: "2025-06-20T00:00:00.000Z",
    author_name: "TRAPA.Security"
  }
]


export async function getDanPost() {
  const authStore = useAuthStore()
  let module = await import('@/secrets/ed2d932989fd4d5a124ef1a0dcc411646fdfe65bf3a6d74f858f74f61282ce8b.js')
  return {
    id: 3, likes: 1,
    content: `偷偷把秘密藏在私人的貼文，應該沒有人會發現吧 👀\n\n${module.secret}`,
    create_time: "2025-06-22T06:09:22.131Z",
    author_name: authStore.username
  }
}

export async function getDorisPost() {
  const authStore = useAuthStore()
  let module = await import('@/secrets/86e1d039770ea0f017a0ac9027247f7c7d55d1d07de504c4eab8b9456ea1183e.js')
  return {
    id: 4, likes: 1,
    content: `偷偷把秘密藏在私人的貼文，應該沒有人會發現吧，而且我還有開 2FA 耶 👀\n\n${module.secret}`,
    create_time: "2025-06-22T13:58:22.131Z",
    author_name: authStore.username
  }
}
