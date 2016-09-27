/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 */

/**
 * App ID for the skill
 */
 var APP_ID = "amzn1.ask.skill.2eef26f0-21c8-4f13-b340-efa1e58a5d0e"; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

var FACTS = [
    "The shortest presidential term was served by the ninth President, William Henry Harrison, who died a month after taking office when he contracted pneumonia.",
    "Franklin D. Roosevelt, the thirty-second President of the United States, gave more executive orders than any other President, with over 3,500 given during his twelve years in office.",
    "The first United States House of Representatives began with fifty-nine Congressman.",
    "The Emancipation Proclamation was an executive order given by Abraham Lincoln in eighteen sixty-three.",
    "George Washington is the only President to ever be elected unanimously by the Electoral College.",
    "Until the Twenty-second Amendment was ratified in nineteen fifty-one, all of the Presidents except Franklin D. Roosevelt retired after two terms because George Washington set it as a precedent, not because it was law.",
    "George Washington wished to serve as President without being paid, but Congress urged him to accept a salary to avoid setting the precedent that only rich people could be President.",
    "George Washington advised against the creation of political parties in one his farewell address.",
    "George Washington privately wanted to abolish slavery, but did not want to bring such a controversial topic into light during his time as President.",
    "Thomas Jefferson wrote the Declaration of Independence.",
    "The United States acquired the Louisiana Territory in the Louisiana Purchase of 1803 during Thomas Jefferson's first presidential term. It was purchased from France, which was ruled by Napoleon at the time.",
    "John and Abigail Adams exchanged over one thousand one hundred letters from seventeen sixty-two to eighteen oh one.",
    "Andrew Jackson was the only U.S. President to completely pay off the national debt.",
    "John F. Kennedy was the only Catholic President.",
    "There are four hundred thirty-five members of the House of Representatives, divided based on the population of each state. However, all states are required to be allowed at least one House member.",
    "There are one hundred members of the U.S. Senate, two for each state.",
    "Barack Obama is the forty-fourth President of the United States. He is the first African-American President.",
    "In the year eighteen hundred, Thomas Jefferson and Aaron Burr tied in electoral votes, so the House of Representatives chose the President.",
    "In the year two thousand, Al Gore won the popular vote but George W. Bush won the electoral vote, meaning Bush won the election.",
    "John F. Kennedy won the election of nineteen sixty against Richard Nixon by only one hundred thousand votes.",
    "In eighteen twenty-four, no presidential candidate won a majority. Andrew Jackson won a plurality of both the popular and electoral vote, but since the law required a majority, the vote went to the House of Representatives, who chose John Quincy Adams as the next President.",
    "Grover Cleveland is the only President who has ever served two non-consecutive Presidential terms.",
    "Woodrow Wilson was the President of the United States during World War One.",
    "The Great Depression began under President Herbert Hoover shortly after he declared that poverty would soon be banished from the country.",
    "Warren G. Harding is often considered the worst U.S. President by historians and scholars due to the many scandals that occurred during his presidency.",
    "The construction of the U.S. interstate highway system began under President Dwight Eisenhower, who signed the bill authorizing it in nineteen fifty-six.",
    "Richard Nixon resigned his position as President due to extremely negative popular opinion after the Watergate Scandal.",
    "Presidents Andrew Johnson and Bill Clinton were the only two that have ever been impeached. However, neither was removed from office.",
    "The most recent Amendment to the Constitution took effect in nineteen ninety-two. It prevented Congress's salary from being altered until after the next Congressional election.",
    "The First Amendment protects the freedoms of speech, religion, the press, petition, and assembly from being impeded by the federal government.",
    "The Second Amendment protects the right to keep and bear arms.",
    "The Third Amendment protects the people from being forced to quarter soldiers in their homes without their consent.",
    "The Fourth Amendment protects the people from unreasonable search and seizure.",
    "The Fifth Amendment protects people against self-incrimination and double jeopardy when being charged with a crime.",
    "The Sixth Amendment protects the right to a fair and speedy public trial and to obtain legal counsel.",
    "The Eighth Amendment prohibits excessive fines, excessive bail, and cruel and unusual punishment.",
    "The Tenth Amendment states that the federal government only has power delegated to it by the states and the people.",
    "The Thirteenth Amendment officially ended slavery in eighteen sixty-five.",
    "The Fourteenth Amendment provides equal protection under the law for all people.",
    "The Fifteenth Amendment prohibits states from denying the right to vote to individuals based on race or color.",
    "Before the Seventeenth Amendment, the Constitution stated that Senators were elected by state legislatures. The Amendment made it so Senators were elected by popular vote.",
    "The Nineteenth Amendment gave women the right to vote in nineteen twenty.",
    "The Eighteenth Amendment made the consumption and sale of alcohol illegal, a rule referred to as prohibition. The Twenty-first Amendment repealed this law.",
    "The Twenty-Sixth Amendment made it a national law that the voting age was eighteen years old.",
    "The richest American ever to live was John D. Rockefeller, who founded the Standard Oil Company in eighteen seventy. He was worth three hundred forty billion dollars adjusting for inflation. In real dollars, he was the first American billionaire.",
    "Three companies now have the rights to the name of the Standard Oil Company founded by John D. Rockefeller: ExxonMobil, Chevron, and BP.",
    "Tech companies such as Amazon, Apple, Hewlett-Packard, Dell, and Microsoft were founded in the United States.",
    "More American lives were lost during the Civil War than any other war.",
    "The United States is the only country to ever use atomic bombs in war. It dropped two bombs on Japan in nineteen forty-five.",
    "According to the Department of Veteran's Affairs, America's involvement in the War on Terror is the longest military involvment in the nation's history.",
    "The United States is the third most populous country after China and India.",
    "By nominal GDP, the United States has the world's largest economy.",
    "The United States accounts for over a third of all military spending worldwide.",
    "Great Britain went into a great deal of debt during the French and Indian War, prompting Parliament to tax the U.S. colonies to cover the cost. Americans felt this was unfair since they had no political representation in Great Britain, prompting the Revolutionary War.",
    "The Southern United States considered the abolition of slavery an attack on their economy because they relied heavily on cotton production. The Southern States seceded and sparked the American Civil War.",
    "The Mexican-American War in the eighteen-forties resulted in the United States acquiring what are now the states of Texas, California, Nevada, Utah, Arizona, New Mexico, Wyoming, and part of Colorado.",
    "Ulysses S. Grant was the General of the U.S. Army during the Civil War and later became the eighteenth President of the United States.",
    "Robert E. Lee was the General in charge of the Confederate Army during the Civil War.",
    "John Pershing, the General in charge of the U.S. Military during World War 1, remains the only military leader raised to the rank of General of the Armies during his own lifetime. This is the highest possible rank the U.S. Military offers. It is the equivalent of a six-star general and only Pershing and George Washington hold the rank today.",
    "The United States attempted to avoid direct conflict during World War 1 until the Zimmerman Telegram was intercepted in nineteen seventeen, three years after the war broke out.",
    "Though World War 2 started in nineteen thirty-nine, the United States did not enter the war until the end of nineteen forty-one, when Japan bombed Pearl Harbor.",
    "President John F. Kennedy and Soviet Leader Nikita Khrushchev negotiated to avoid nuclear war due to the Cuban Missile Crisis.",
    "Wars such as the Korean and Vietnam Wars, where the United States and the Soviet Union did not directly fight but aided opposing sides, are considered proxy wars of the Cold War.",
    "The Truman Doctrine of nineteen forty-seven established the precedent that the United States would support any country opposing the Soviet Union's expansion.",
    "The Soviet Union collapsed in nineteen ninety-one, which is often considered the year that the Cold War ended.",
    "The September 11th attacks in two thousand one resulted in the deaths of almost three thousand people. Four hundred fifteen police officers and firefighters died trying to help others after the attacks.",
    "Four planes were hijacked on September 11th. One was meant to be crashed into either the Capitol Building or the White House, but the passengers on the hijacked plane stopped the terrorists. This plane, United Airlines Flight 93, crashed into a field in Pennsylvania instead.",
    "Osama bin Laden took responsiblity for plotting the September 11th attacks in two thousand four. He was found and killed by SEAL Team Six of the U.S. military in twenty eleven.",
    "In November twenty sixteen, the major presidential candidates running for office are Hillary Clinton for the Democratic Party, Donald Trump for the Republican Party, Jill Stein for the Green Party and Gary Johnson of the Libertarian Party.",
    "The Civil Rights Act of nineteen sixty-four ended legalized racial segregation in the United States.",
    "The Supreme Court case Brown v. Board of Education banned racial segregation in schools in nineteen fifty-four.",
    "In twenty fifteen, the Supreme Court case Obergefell v. Hodges ruled that same-sex marriage is legal in the United States."
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * SpaceGeek is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var Fact = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Fact.prototype = Object.create(AlexaSkill.prototype);
Fact.prototype.constructor = Fact;

Fact.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    //console.log("onSessionStarted requestId: " + sessionStartedRequest.requestId + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

Fact.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    //console.log("onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
Fact.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    //console.log("onSessionEnded requestId: " + sessionEndedRequest.requestId + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

Fact.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can say tell me a history fact, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random fact from the history facts list
    var factIndex = Math.floor(Math.random() * FACTS.length);
    var randomFact = FACTS[factIndex];

    // Create speech output
    var speechOutput = "Here's your fact: " + randomFact;
    var cardTitle = "Your Fact";
    response.tellWithCard(speechOutput, cardTitle, speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the SpaceGeek skill.
    var fact = new Fact();
    fact.execute(event, context);
};