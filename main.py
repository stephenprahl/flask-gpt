from flask import Flask, render_template, request, jsonify
import google.generativeai as genai

app = Flask(__name__)

# Gemini API Key
GEMINI_API_KEY = "AIzaSyD1FWas71mgtlP-4jp3OUvMZ92gA6FTmFs"
genai.configure(api_key=GEMINI_API_KEY)


def get_completion(prompt):
    print(prompt)
    # Initialize the model
    model = genai.GenerativeModel("gemini-1.5-pro")

    # Generate response
    response = model.generate_content(prompt)

    # Return the text response
    return response.text


@app.route("/", methods=["POST", "GET"])
def query_view():
    if request.method == "POST":
        print("step1")
        prompt = request.form["prompt"]
        response = get_completion(prompt)
        print(response)

        return jsonify({"response": response})
    return render_template("index.html")


if __name__ == "__main__":
    app.run(debug=True)
