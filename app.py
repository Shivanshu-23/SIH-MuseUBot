from flask import Flask, request, jsonify
from flask_cors import CORS
import MySQLdb

app = Flask(__name__)
CORS(app)

# MySQL Database Configuration
db_config = {
    'host': 'localhost',
    'user': 'root',  # Use your MySQL username
    'password': 'admin123',  # Use your MySQL password
    'database': 'museumbooking',  # Name of the database
    'port': 3306,  # MySQL port (default is 3306)
}

# Function to establish connection with MySQL
def connect_db():
    return MySQLdb.connect(
        host=db_config['host'],
        user=db_config['user'],
        passwd=db_config['password'],
        db=db_config['database'],
        port=db_config['port']
    )

# Endpoint to handle ticket booking requests
@app.route('/booking', methods=['POST'])
def book_ticket():
    data = request.get_json()

    # Extract booking details from the request
    state = data.get('state')
    city = data.get('city')
    museum = data.get('museum')
    visit_date = data.get('date')
    visit_time = data.get('time')
    num_people = data.get('people')

    # Validate input
    if not (state and city and museum and visit_date and visit_time and num_people):
        return jsonify({'error': 'All fields are required.'}), 400

    try:
        # Connect to MySQL database
        conn = connect_db()
        cursor = conn.cursor()

        # SQL query to insert booking data into the database
        query = """
            INSERT INTO bookings (state, city, museum, visit_date, visit_time, num_people)
            VALUES (%s, %s, %s, %s, %s, %s)
        """
        cursor.execute(query, (state, city, museum, visit_date, visit_time, num_people))

        # Commit the transaction
        conn.commit()

        # Close the database connection
        cursor.close()
        conn.close()

        # Return success response
        return jsonify({'message': 'Booking confirmed successfully!'}), 201

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': 'Failed to save booking. Please try again later.'}), 500

# Run the Flask application
if __name__ == '__main__':
    app.run(debug=True)
