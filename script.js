document.addEventListener("DOMContentLoaded", function () {
	const questionContainer = document.getElementById("questionContainer");

	const questions = [
		{ 
			label: "4H Trend is marked", 
			text: "(Bearish = Lower Lows, Bullish = Higher Highs)<br><a href='https://www.evolutionmarketsfx.com/products/the-power-of-two-tpot/categories/2153383497/posts/2170215606' target='_blank' rel='noopener'>Video lesson: 4H MOMENTUM FILTER MARKING HIGHS & LOWS</a>"
		},
		{
			label: "4H Range is marked", 
			text: "<a href='https://www.evolutionmarketsfx.com/products/the-power-of-two-tpot/categories/2153383497/posts/2170215538' target='_blank' rel='noopener'>Video lesson: 4H HIGH/LOW PLOTTING</a>" 
		},
		{
			label: "4H Bias is confirmed", 
			text: "(FT / NFT / SFT)<br>(Unconfirmed = Wait for candle close which will confirm bias. Until this NO Trade.)<br><a href='https://www.evolutionmarketsfx.com/products/the-power-of-two-tpot/categories/2153383497/posts/2169719894' target='_blank' rel='noopener'>Video lesson: DIRECTIONAL BIAS</a>" 
		},
		{
			label: "15M range is marked",
			text: "<a href='https://www.evolutionmarketsfx.com/products/the-power-of-two-tpot/categories/2153383497/posts/2170215578' target='_blank' rel='noopener'>Video lesson: 15M HIGH/LOW PLOTTING AND RANGES</a>"
		},
		{
			label: "Market is in my Killzone",
			text: "<a href='https://www.evolutionmarketsfx.com/products/the-power-of-two-tpot/categories/2153383497/posts/2167918505' target='_blank' rel='noopener'>Image: SESSION TIMIMG</a>" 
		},
		{
			label: "I don't have other active trades in the same direction", 
			text: "If yes, do not trade until previous trade is finished" 
		},
		{
			label: "Possible trade direction is aligned with 4H Bias (Pro-bias) or with 4H Trend (Pro-trend, Counter-bias)", 
			text: "<a href='https://www.evolutionmarketsfx.com/products/the-power-of-two-tpot/categories/2152365791/posts/2170171962' target='_blank' rel='noopener'>Video lesson: TRADE MATRIX</a><br><a href='https://www.evolutionmarketsfx.com/courses/downloads/2155137740/tpot_trade_matrix-pdf' target='_blank' rel='noopener'>PDF: TRADE MATRIX</a>" 
		},
		{
			label: "Alerts are set on 15M external range and/or internal range (last internal fractal) in desired direction.",
			text: "Or I'm staring to the charts and don't need alerts.."
		},
		{
			label: "Price swept 15M external range (or internal range) by at least 1 pip?"
		},
		{
			label: "Price is still inside 4H Range",
			text: "If not, do not trade until new 4H Bias is confirmed. (go back to step 3 - 4H Bias confirmation)" 
		},
		{
			label: "Killzone is without Restricted market news. Or the sweep is at least 1 hour after news event", 
			text: "Turn on events in your TradingView chart.<br>Or check list here <a href='https://www.tradingview.com/economic-calendar/' target='_blank' rel='noopener'>TradingView Economic Calendar</a><br>(Select High Importance news and select only markets you trade)" 
		},
		{
			label: "Price sweep and trade entry are in Well priced area", 
			text: "(Fib retracement 0-45% or 55-100%) (SFT trade has no limitations here)<br><a href='https://www.evolutionmarketsfx.com/products/the-power-of-two-tpot/categories/2153383497/posts/2170215546' target='_blank' rel='noopener'>Video lesson: WELL PRICED - PREMIUM VS DISCOUNT</a>" 
		},
		{
			label: "Entry/sweep candle is reasonably sized (according to last 20 candles)", 
			text: "<a href='https://www.evolutionmarketsfx.com/products/the-power-of-two-tpot/categories/2153383497/posts/2170215627' target='_blank' rel='noopener'>Video lesson: ENTRIES</a>" 
		},
		{
			label: "Stop Loss (SL) is smaller than 20 pips (EU, UC) with 1-2 pips buffer or 30 pips (GU) with 3-4 pips buffer", 
			text: "<a href='' target='_blank' rel='noopener'>Video lesson: </a>" 
		},
		{
			label: "Take Profit (TP) target 1:3 RR is within 4H range. Or at least 1:2 RR for SFT bias trades", 
			text: "Wait for end of 15M candle (that made the sweep) and place stop limit order with SL and TP + place alert on SL and TP" 
		},
		{
			label: "Price is still in my Killzone", 
			text: "If not, cancel the pending order" 
		},
		{
			label: "Price swept SL before entering trade (Extended sweep)", 
			text: "Cancel pending limit order. Wait for end of 15M candle and then place new Stop limit order.<br>(Must meet all previous criteria - be in killzone, proper size of candle, not too close to 4H range, 1:3 RR inside 4H range). Wait for the end of next 15 candle." 
		},
		{
			label: "Next candle after placing limit order swept the SL again",
			text: "Cancel pending order and place new one as in previous step"
		},
		{
			label: "Next candle did not trigger the trade nor swept the SL", 
			text: "Cancel pending order and do not trade this direction in this Killzone again. Wait for next Killzone and repeat checklist" 
		}
	];

	questions.forEach((question, index) => {
		const questionDiv = document.createElement("div");
		questionDiv.classList.add("question");

		if (index > 0) {
			questionDiv.classList.add("is-hidden");
		}

		const checkbox = document.createElement("input");
		checkbox.type = "checkbox";
		checkbox.classList.add("question-checkbox");
		checkbox.id = `q${index + 1}-checkbox`;

		const label = document.createElement("label");
		label.htmlFor = `q${index + 1}-checkbox`;
		label.textContent = question.label;

		questionDiv.appendChild(checkbox);
		questionDiv.appendChild(label);

		if (question.text) {
			const customContent = document.createElement("p");
			customContent.innerHTML = question.text;
			questionDiv.appendChild(customContent);
		}

		questionContainer.appendChild(questionDiv);
	});

	const checkboxes = document.querySelectorAll(".question-checkbox");

	function hideQuestions(startIndex) {
		for (let i = startIndex; i < questions.length; i++) {
			questionContainer.children[i].classList.add("is-hidden");
			checkboxes[i].checked = false;
		}
	}

	checkboxes.forEach((checkbox, index) => {
	  checkbox.addEventListener("change", function () {
		if (checkbox.checked) {
			if (questionContainer.children[index + 1]) {
				questionContainer.children[index + 1].classList.remove("is-hidden");
				questionContainer.children[index + 1].scrollIntoView({ behavior: "smooth" });
			}
		} else {
			hideQuestions(index + 1);
		}
		saveCheckboxState();
	  });
	});

	function saveCheckboxState() {
		const checkboxStates = Array.from(checkboxes).map(checkbox => checkbox.checked);
		localStorage.setItem("checkboxStates", JSON.stringify(checkboxStates));
	}

	function loadCheckboxState() {
	  const savedCheckboxStates = JSON.parse(localStorage.getItem("checkboxStates"));
	  if (savedCheckboxStates) {
		savedCheckboxStates.forEach((isChecked, index) => {
			checkboxes[index].checked = isChecked;
			if (isChecked && questionContainer.children[index + 1]) {
				questionContainer.children[index + 1].classList.remove("is-hidden");
			} else {
				hideQuestions(index + 1);
			}
		});
	  }
	}

	loadCheckboxState();
});
