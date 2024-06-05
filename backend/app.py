from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient
from crewai import Agent, Task, Crew, Process
from crewai_tools import SerperDevTool
import os

# Function to fetch data from MongoDB
app = Flask(__name__, template_folder='../templates')
app.secret_key = 'b*\xb9\xe7\xfc\xac\x14\xd1\x96\xc5\xf1\xddm\xcf\xb3r\xce\x0eo\x18\xaf6n\xbe\xa6\x9e*'

# Manually serve static files from the templates folder
@app.route('/css/<path:path>')
def send_css(path):
    return send_from_directory('../templates/css', path)

@app.route('/images/<path:path>')
def send_images(path):
    return send_from_directory('../templates/images', path)

@app.route('/js/<path:path>')
def send_js(path):
    return send_from_directory('../templates/js', path)

# Setup MongoDB connection
connection_string = "mongodb+srv://sbp1784:OBbxnqbZowezp2qX@iwazolab.sksu1fm.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(connection_string)
db = client["fintech"]
originals_collection = db["rawData"]


def fetch_data_from_mongo(query):
  data = originals_collection.find(query)
  return list(data)

# Directly set the environment variables in the script
os.environ["OPENAI_API_BASE"] = 'https://api.groq.com/openai/v1'
os.environ["OPENAI_MODEL_NAME"] = 'llama3-70b-8192'
os.environ["OPENAI_API_KEY"] = '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'

# Define your agents with roles and goals
search_tool = SerperDevTool()

#user_input = "What is Mpesa"
#is_verbose = True

# Agent for conducting research on financial literacy
researcher = Agent(
    role='Financial Research Analyst',
    goal='Investigate and gather comprehensive information on financial literacy and fintech developments in Kenya.',
    backstory="""You are an expert in financial research with extensive experience in analyzing economic trends and fintech innovations.
    Your job is to gather accurate and relevant data to enhance the financial literacy model, Finlingo. You will cover the following features:
    - Financial Literacy Education: Explain saving, borrowing, investing, and financial statements using multimedia elements and adaptive quizzes.
    - Personalized Financial Health Assessments: Conduct assessments and offer tailored recommendations.
    - Practical Financial Management Tools: Provide interactive budgeting tools, savings calculators, debt repayment plans, and investment advice.
    - Fintech Information and Guidance: Offer detailed explanations of fintech concepts, highlight trends, and use real-life examples.
    - Community and Social Features: Support users in community groups and peer comparisons.
    - Gamification: Implement rewards, challenges, and leaderboards.
    - Educational Modules: Create modules on entrepreneurship, digital currencies, and sustainable investing.
    - Interactive Financial Planning Tools: Develop long-term financial planning and scenario analysis tools.
    - Localized Content: Ensure advice is tailored to the Kenyan context and available in multiple languages.
    - Alerts and Notifications: Send alerts about bills, savings milestones, and market news.
    - Advanced Analytics: Analyze spending and saving patterns, and provide trend analysis and forecasting.
    - Compliance and Security: Ensure compliance with financial regulations and data privacy laws.
    - External Integrations: Integrate with popular financial services and apps in Kenya.
    - Additional Features: Include microfinance information, insurance education, financial scams awareness, government schemes, tax education, small business finance, retirement planning, and impact of inflation and exchange rates.
    """,
    verbose=True,
    allow_delegation=False
)

# Agent for writing content based on research
writer = Agent(
    role='Financial Content Writer',
    goal='Create engaging and informative content on financial literacy topics for the Finlingo model.',
    backstory="""You are a seasoned content writer with a passion for simplifying complex financial concepts.
    Your role is to transform research insights into accessible and engaging content for users. You will create content that covers:
    - Financial Literacy Education: Simplify saving, borrowing, investing, and financial statements into easy-to-understand formats using multimedia elements and adaptive quizzes.
    - Personalized Financial Health Assessments: Explain how to use personalized recommendations and assessments.
    - Practical Financial Management Tools: Develop guides on using budgeting tools, savings calculators, debt repayment plans, and investment advice.
    - Fintech Information and Guidance: Write about fintech concepts, highlight trends, and provide real-life examples relevant to Kenya.
    - Community and Social Features: Encourage participation in community groups and peer comparisons.
    - Gamification: Explain the rewards system, challenges, and leaderboards.
    - Educational Modules: Develop content on entrepreneurship, digital currencies, and sustainable investing.
    - Interactive Financial Planning Tools: Create content on long-term financial planning and scenario analysis.
    - Localized Content: Ensure content is tailored to the Kenyan context and available in multiple languages.
    - Alerts and Notifications: Write about the importance of alerts for bills, savings milestones, and market news.
    - Advanced Analytics: Simplify the analysis of spending and saving patterns, and explain trend analysis and forecasting.
    - Compliance and Security: Ensure users understand compliance with financial regulations and data privacy laws.
    - External Integrations: Explain how to integrate with popular financial services and apps in Kenya.
    - Additional Features: Provide information on microfinance, insurance, financial scams, government schemes, taxes, small business finance, retirement planning, and the impact of inflation and exchange rates.
    """,
    verbose=True,
    allow_delegation=True
)


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/chat', methods=['POST'])
def chat():
    user_input = request.json.get('message')
    print(f"Received user input: {user_input}")
    
    query = {"message": user_input}
    mongo_data = fetch_data_from_mongo(query)
    print(f"Fetched data from MongoDB: {mongo_data}")
    
    task1 = Task(
        description=f"""Conduct a detailed analysis of the user query: "{user_input}" using data from MongoDB.
        Identify key trends, technologies, and their impacts on rural communities in Kenya in 2024.""",
        expected_output="Comprehensive analysis report in bullet points",
        agent=researcher,
        data_fetch_function=lambda: mongo_data
    )

    task2 = Task(
        description=f"""Using the insights from the research report on "{user_input}", develop engaging educational content that highlights the most significant financial literacy and fintech advancements.
        The content should be clear and accessible, catering to a rural Kenyan audience. Use simple language to ensure understanding.""",
        expected_output="Concise content with key points, relevant to the user's question, formatted with new lines and spaces",
        agent=writer
    )

    crew = Crew(
        agents=[researcher, writer],
        tasks=[task1, task2],
        verbose=2
    )

    result = crew.kickoff()
    print(f"Crew result: {result}")

    formatted_result = format_response(result)
    return jsonify({"message": formatted_result})

def format_response(response):
    # Split the response into paragraphs by double newline
    paragraphs = response.split("\n\n")
    formatted_paragraphs = [para.replace("* ", "- ") for para in paragraphs]
    formatted_response = "\n\n".join(formatted_paragraphs)
    return formatted_response

if __name__ == '__main__':
    app.run(debug=True)
