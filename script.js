document.addEventListener("DOMContentLoaded", function () {
	const questionContainer = document.getElementById("questionContainer");

	
	fetch('https://vlastapolach.cz/tpot-checklist/checklist-questions.json')
    	.then(response => response.json())
    	.then(questions => {
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
	});
