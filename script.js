// 模擬從澳門政府數據開放平台 (data.gov.mo) 獲取的即時天氣
async function getMacauWeather() {
    // 實際開發時對接氣象局 API，此處先以模擬數據示範
    return {
        temperature: 31.5,
        humidity: 88, // 濕度高
        condition: "多雲"
    };
}

// 核心推薦引擎
async function generateHealerWalk(userMood) {
    const weather = await getMacauWeather();
    
    // 1. 將天氣與情緒發送給 Dify API (此處為概念碼)
    // const difyResponse = await callDifyWorkflow(weather.temperature, weather.humidity, userMood);
    // 假設 Dify 運算後回傳了我們需要的對沖標籤
    const requiredTags = ["通風", "高地"]; // 因為濕度高，Dify 建議去通風高地
    const dietAdvice = "建議飲用陳皮普洱茶，去濕理氣。";

    // 2. 讀取景點數據庫並進行前端篩選 (Filter)
    const allSpots = await fetch('./spots.json').then(res => res.json());
    
    // 篩選出具備對沖標籤的景點
    const recommendedRoute = allSpots.filter(spot => 
        spot.tags.some(tag => requiredTags.includes(tag))
    );

    // 3. 渲染到網頁畫面上
    renderToUI(weather, userMood, recommendedRoute, dietAdvice);
}

function renderToUI(weather, mood, routes, diet) {
    console.log(`【今日澳門氣候】: 氣溫 ${weather.temperature}度, 濕度 ${weather.humidity}%`);
    console.log(`【用戶當前心境】: ${mood}`);
    console.log(`【中醫膳食建議】: ${diet}`);
    console.log(`【推薦 Citywalk 景點】:`, routes.map(r => r.name).join(" -> "));
}

// 測試運行：假設用戶選擇了「憂」
generateHealerWalk("憂");