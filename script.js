document.addEventListener('DOMContentLoaded', () => {
    const topicTitle = document.getElementById('topic-title');
    const problemText = document.getElementById('problem-text');
    const answerInput = document.getElementById('answer-input');
    const submitBtn = document.getElementById('submit-btn');
    const nextBtn = document.getElementById('next-btn');
    const feedbackText = document.getElementById('feedback-text');
    const explanationBox = document.getElementById('explanation-box');
    const explanationText = document.getElementById('explanation-text');
    const scoreDisplay = document.getElementById('score-display');

    const correctSound = document.getElementById('correct-sound');
    const incorrectSound = document.getElementById('incorrect-sound');

    const problemBankSource = {
        "Multiplying Binomials (FOIL)": [
            {
                q: "Simplify: (x + 2)(x + 3)",
                a: "x^2 + 5x + 6",
                ex: `
                    <p>To multiply two binomials like (x + 2)(x + 3), we can use the <strong>FOIL</strong> method. FOIL stands for First, Outer, Inner, Last, which helps remember the pairs of terms to multiply:</p>
                    <ul>
                        <li><strong>F</strong>irst: Multiply the first terms in each binomial: (x)(x) = x<sup>2</sup></li>
                        <li><strong>O</strong>uter: Multiply the outer terms: (x)(3) = 3x</li>
                        <li><strong>I</strong>nner: Multiply the inner terms: (2)(x) = 2x</li>
                        <li><strong>L</strong>ast: Multiply the last terms in each binomial: (2)(3) = 6</li>
                    </ul>
                    <p>Now, write these products together:</p>
                    <p>x<sup>2</sup> + 3x + 2x + 6</p>
                    <p>Finally, combine like terms (the terms with 'x'):</p>
                    <p>3x + 2x = 5x</p>
                    <p>So the simplified expression is: <strong>x<sup>2</sup> + 5x + 6</strong></p>
                `
            },
            {
                q: "Simplify: (2y - 1)(y + 4)",
                a: "2y^2 + 7y - 4",
                ex: `
                    <p>We use the <strong>FOIL</strong> method to multiply (2y - 1)(y + 4):</p>
                    <ul>
                        <li><strong>F</strong>irst: (2y)(y) = 2y<sup>2</sup></li>
                        <li><strong>O</strong>uter: (2y)(4) = 8y</li>
                        <li><strong>I</strong>nner: (-1)(y) = -y</li>
                        <li><strong>L</strong>ast: (-1)(4) = -4</li>
                    </ul>
                    <p>Combine these results:</p>
                    <p>2y<sup>2</sup> + 8y - y - 4</p>
                    <p>Combine like terms (8y and -y):</p>
                    <p>8y - y = 7y</p>
                    <p>The simplified expression is: <strong>2y<sup>2</sup> + 7y - 4</strong></p>
                `
            }
            // TODO: Add more FOIL problems with detailed explanations
        ],
        "Square of a Binomial": [
            {
                q: "Simplify: (x + 4)<sup>2</sup>", // Using sup for display
                a: "x^2 + 8x + 16",
                ex: `
                    <p>To simplify (x + 4)<sup>2</sup>, we can use the special product formula for the square of a sum: <strong>(a + b)<sup>2</sup> = a<sup>2</sup> + 2ab + b<sup>2</sup></strong>.</p>
                    <p>In this case, 'a' is x and 'b' is 4.</p>
                    <p>Substitute into the formula:</p>
                    <ul>
                        <li>a<sup>2</sup> = (x)<sup>2</sup> = x<sup>2</sup></li>
                        <li>2ab = 2(x)(4) = 8x</li>
                        <li>b<sup>2</sup> = (4)<sup>2</sup> = 16</li>
                    </ul>
                    <p>Combine these terms:</p>
                    <p><strong>x<sup>2</sup> + 8x + 16</strong></p>
                    <p>Alternatively, you could write (x + 4)<sup>2</sup> as (x + 4)(x + 4) and use the FOIL method.</p>
                `
            }
            // TODO: Add more Square of Binomial problems with detailed explanations
        ],
        "Difference of Squares (Multiplying)": [
            {
                q: "Simplify: (x + 5)(x - 5)",
                a: "x^2 - 25",
                ex: `
                    <p>This is a product of the sum and difference of two terms, which follows the pattern: <strong>(a + b)(a - b) = a<sup>2</sup> - b<sup>2</sup></strong>.</p>
                    <p>In this problem, (x + 5)(x - 5):</p>
                    <ul>
                        <li>'a' is x</li>
                        <li>'b' is 5</li>
                    </ul>
                    <p>Substitute into the formula:</p>
                    <p>a<sup>2</sup> - b<sup>2</sup> = (x)<sup>2</sup> - (5)<sup>2</sup></p>
                    <p>Calculate the squares:</p>
                    <p>x<sup>2</sup> - 25</p>
                    <p>So, the simplified expression is: <strong>x<sup>2</sup> - 25</strong></p>
                `
            }
            // TODO: Add more Difference of Squares problems
        ],
        "Factoring GCF": [
            {
                q: "Factor: 8 + 6x",
                a: "2(4 + 3x)", // Or 2(3x + 4) - normalizeAnswer should handle simple order changes for sums
                ex: `
                    <p>To factor an expression using the Greatest Common Factor (GCF), we find the largest number and/or variable that divides into each term of the expression.</p>
                    <p>The terms are 8 and 6x.</p>
                    <ul>
                        <li>Factors of 8: 1, 2, 4, 8</li>
                        <li>Factors of 6: 1, 2, 3, 6. The variable part is x.</li>
                    </ul>
                    <p>The GCF of the numbers 8 and 6 is 2. The variable x is only in one term, so it's not part of the GCF.</p>
                    <p>Now, divide each term by the GCF (2):</p>
                    <ul>
                        <li>8 ÷ 2 = 4</li>
                        <li>6x ÷ 2 = 3x</li>
                    </ul>
                    <p>Write the GCF outside parentheses and the results of the division inside:</p>
                    <p><strong>2(4 + 3x)</strong></p>
                `
            }
            // TODO: Add more GCF problems
        ],
        "Factoring Difference of Squares": [
            {
                q: "Factor: x<sup>2</sup> - 49", // Using sup for display
                a: "(x + 7)(x - 7)",
                ex: `
                    <p>This expression, x<sup>2</sup> - 49, is a difference of two squares. The formula for factoring a difference of squares is: <strong>a<sup>2</sup> - b<sup>2</sup> = (a + b)(a - b)</strong>.</p>
                    <p>First, identify 'a' and 'b':</p>
                    <ul>
                        <li>The first term is x<sup>2</sup>, so a = √x<sup>2</sup> = x.</li>
                        <li>The second term is 49, so b = √49 = 7.</li>
                    </ul>
                    <p>Now, substitute 'a' and 'b' into the formula (a + b)(a - b):</p>
                    <p><strong>(x + 7)(x - 7)</strong></p>
                `
            }
            // TODO: Add more Factoring Difference of Squares
        ],
        "Pythagorean Theorem": [
            {
                q: "A right triangle has legs of length 3 units and 4 units. What is the length of the hypotenuse?",
                a: "5",
                ex: `
                    <p>To find the length of the hypotenuse of a right triangle when the lengths of the two legs are known, we use the <strong>Pythagorean Theorem</strong>.</p>
                    <p>The theorem states: <strong>a<sup>2</sup> + b<sup>2</sup> = c<sup>2</sup></strong></p>
                    <p>Where:</p>
                    <ul>
                        <li>'a' and 'b' are the lengths of the legs of the right triangle.</li>
                        <li>'c' is the length of the hypotenuse (the side opposite the right angle).</li>
                    </ul>
                    <p>In this problem, the given leg lengths are:</p>
                    <ul>
                        <li>Let leg 'a' = 3 units</li>
                        <li>Let leg 'b' = 4 units</li>
                    </ul>
                    <p>Substitute these values into the formula:</p>
                    <p>(3)<sup>2</sup> + (4)<sup>2</sup> = c<sup>2</sup></p>
                    <p>Calculate the squares:</p>
                    <p>9 + 16 = c<sup>2</sup></p>
                    <p>Add the numbers on the left side:</p>
                    <p>25 = c<sup>2</sup></p>
                    <p>To find 'c', take the square root of both sides of the equation:</p>
                    <p>√25 = √c<sup>2</sup></p>
                    <p>c = 5</p>
                    <p>So, the length of the hypotenuse is <strong>5 units</strong>.</p>
                `
            },
            {
                q: "The hypotenuse of a right triangle is 13 cm and one leg is 5 cm. What is the length of the other leg?",
                a: "12",
                ex: `
                    <p>We use the Pythagorean Theorem: <strong>a<sup>2</sup> + b<sup>2</sup> = c<sup>2</sup></strong>, where 'c' is the hypotenuse.</p>
                    <p>Given:</p>
                    <ul>
                        <li>Hypotenuse 'c' = 13 cm</li>
                        <li>One leg (let's say 'a') = 5 cm</li>
                        <li>We need to find the other leg ('b').</li>
                    </ul>
                    <p>Substitute the known values into the formula:</p>
                    <p>(5)<sup>2</sup> + b<sup>2</sup> = (13)<sup>2</sup></p>
                    <p>Calculate the squares:</p>
                    <p>25 + b<sup>2</sup> = 169</p>
                    <p>To solve for b<sup>2</sup>, subtract 25 from both sides:</p>
                    <p>b<sup>2</sup> = 169 - 25</p>
                    <p>b<sup>2</sup> = 144</p>
                    <p>To find 'b', take the square root of both sides:</p>
                    <p>√b<sup>2</sup> = √144</p>
                    <p>b = 12</p>
                    <p>So, the length of the other leg is <strong>12 cm</strong>.</p>
                `
            }
            // TODO: Add more Pythagorean Theorem problems
        ]
        // TODO: Add ALL OTHER TOPICS from your study guide here, each with multiple problems
        // and detailed, HTML-formatted explanations for each problem.
        // Examples:
        // "Adding Polynomials": [ ... ],
        // "Subtracting Polynomials": [ ... ],
        // "Naming polynomials by degree/terms": [ ... ],
        // "Factoring trinomials when a=1": [ ... ],
        // "Solving Multi-Step Equations": [ ... ],
        // ... and so on for all topics in your study guide.
    };

    let allProblems = [];
    let currentProblem = null;
    let attemptsLeft = 2;
    let currentProblemIndex = 0;
    let score = 0;
    let questionsAnsweredInSession = 0;

    function initializeProblems() {
        allProblems = [];
        for (const topic in problemBankSource) {
            problemBankSource[topic].forEach(problem => {
                allProblems.push({ ...problem, originalTopic: topic });
            });
        }
        for (let i = allProblems.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [allProblems[i], allProblems[j]] = [allProblems[j], allProblems[i]];
        }
        currentProblemIndex = 0;
    }

    function loadProblem() {
        if (allProblems.length === 0) {
            topicTitle.textContent = "Math Practice";
            problemText.innerHTML = "No problems available. Please add them to the script."; // Use innerHTML for problem text too if using <sup>
            answerInput.style.display = 'none';
            submitBtn.style.display = 'none';
            nextBtn.style.display = 'none';
            return;
        }

        if (currentProblemIndex >= allProblems.length) {
            topicTitle.textContent = "Quiz Complete!";
            problemText.innerHTML = `You've attempted all available problems! Your final score is ${score}/${questionsAnsweredInSession}. Reload to try again.`;
            answerInput.style.display = 'none';
            submitBtn.style.display = 'none';
            nextBtn.style.display = 'none';
            return;
        }

        currentProblem = allProblems[currentProblemIndex];
        topicTitle.textContent = `Problem from: ${currentProblem.originalTopic}`;
        problemText.innerHTML = currentProblem.q; // Use innerHTML to render tags like <sup>
        answerInput.value = '';
        feedbackText.textContent = '';
        feedbackText.className = '';
        explanationBox.style.display = 'none';
        explanationText.innerHTML = ''; // Clear previous explanation
        answerInput.style.display = 'inline-block';
        submitBtn.style.display = 'inline-block';
        nextBtn.style.display = 'none';
        answerInput.disabled = false;
        submitBtn.disabled = false;
        attemptsLeft = 2;
    }
    
    function normalizeAnswer(answer) {
        // Remove extra spaces, convert to lowercase for consistency
        // Replace multiple spaces with a single space
        // Remove spaces around ^ if user types it
        // Be careful with order for sums, e.g. "x+2" vs "2+x". For now, this is strict.
        return answer.trim().toLowerCase().replace(/\s*(\^)\s*/g, '$1').replace(/\s+/g, ' ');
    }

    function checkAnswer() {
        if (!currentProblem) return;

        const userAnswer = normalizeAnswer(answerInput.value);
        const correctAnswer = normalizeAnswer(currentProblem.a);

        if (userAnswer === correctAnswer) {
            feedbackText.textContent = "Correct!";
            feedbackText.className = 'correct';
            correctSound.play();
            score++;
            questionsAnsweredInSession++;
            answerInput.disabled = true;
            submitBtn.disabled = true;
            nextBtn.style.display = 'inline-block';
            explanationText.innerHTML = currentProblem.ex; // Show explanation on correct too, or only on wrong? For now, always after an attempt that locks the answer.
            explanationBox.style.display = 'block';
        } else {
            attemptsLeft--;
            incorrectSound.play();
            if (attemptsLeft > 0) {
                feedbackText.textContent = `Incorrect. ${attemptsLeft} attempt(s) left.`;
                feedbackText.className = 'incorrect';
                answerInput.focus();
                answerInput.select();
            } else {
                feedbackText.textContent = `Incorrect. The correct answer was: ${currentProblem.a}`;
                feedbackText.className = 'incorrect';
                explanationText.innerHTML = currentProblem.ex;
                explanationBox.style.display = 'block';
                questionsAnsweredInSession++;
                answerInput.disabled = true;
                submitBtn.disabled = true;
                nextBtn.style.display = 'inline-block';
            }
        }
        updateScoreDisplay();
    }

    function handleNextProblem() {
        currentProblemIndex++;
        loadProblem();
    }

    function updateScoreDisplay() {
        let denominator = questionsAnsweredInSession > 0 ? questionsAnsweredInSession : 0;
        scoreDisplay.textContent = `Score: ${score} / ${denominator}`;
    }

    // Event Listeners
    submitBtn.addEventListener('click', checkAnswer);
    answerInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter' && !submitBtn.disabled) {
            event.preventDefault(); 
            submitBtn.click();
        }
    });
    nextBtn.addEventListener('click', handleNextProblem);

    // Initial Setup
    initializeProblems();
    if (allProblems.length > 0) {
        loadProblem();
    } else {
        topicTitle.textContent = "Math Practice";
        problemText.innerHTML = "No problems defined. Please add them to script.js.";
        answerInput.style.display = 'none';
        submitBtn.style.display = 'none';
    }
    updateScoreDisplay();
});