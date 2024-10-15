from flask import Flask, request, jsonify
from flask_cors import CORS
import MySQLdb
import bcrypt

app = Flask(__name__)
CORS(app)

# MySQL Database Configuration
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '',# give password string of yout mysql
    'database': 'museumbooking',
    'port': 3306,
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

# Endpoint for user registration (signup)
@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()#get the data from json body

    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    # Validate input
    if not (username and email and password):
        return jsonify({'error': 'All fields are required.'}), 400

    # Hash the password before storing it
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())#gen hashed pass from bcrypt salt

    try:
        # Connect to MySQL database
        conn = connect_db()
        cursor = conn.cursor()

        # SQL query to insert user data into the database
        query = """
            INSERT INTO users (username, email, password)
            VALUES (%s, %s, %s)
        """
        cursor.execute(query, (username, email, hashed_password.decode('utf-8')))#insert in db

        conn.commit()

        # Close the database connection
        cursor.close()
        conn.close()

        # Return success response
        return jsonify({'message': 'User is registered successfully!'}), 201

    except MySQLdb.IntegrityError:
        return jsonify({'error': 'Username or email already exists.'}), 400
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': 'Failed to register user. Please try again later.'}), 500

# Endpoint for user login
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    # Extract login details from the request
    username = data.get('username')
    password = data.get('password')

    # Validate input
    if not (username and password):
        return jsonify({'error': 'Username and password are required.'}), 400

    try:
        # Connect to MySQL database
        conn = connect_db()
        cursor = conn.cursor()

        # SQL query to fetch user data from the database
        query = "SELECT id, password FROM users WHERE username = %s"
        cursor.execute(query, (username,))
        result = cursor.fetchone()

        if result is None:
            return jsonify({'error': 'Invalid username or password.'}), 400

        # Get the stored hashed password
        stored_password = result[1]

        # Verify the password using bcrypt
        if bcrypt.checkpw(password.encode('utf-8'), stored_password.encode('utf-8')): #check from hashed password
            return jsonify({'message': 'Login successful!', 'user_id': result[0]}), 200
        else:
            return jsonify({'error': 'Invalid username or password.'}), 400

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': 'Login failed. Please try again later.'}), 500

# Endpoint to handle ticket booking requests
@app.route('/booking', methods=['POST'])
def book_ticket():
    data = request.get_json()

    # Extract booking details from the request
    user_id = data.get('user_id')  # Get the user ID from the request
    state = data.get('state')
    city = data.get('city')
    museum = data.get('museum')
    visit_date = data.get('date')
    visit_time = data.get('time')
    num_people = data.get('people')

    # Validate input
    if not (user_id and state and city and museum and visit_date and visit_time and num_people):
        return jsonify({'error': 'All fields are required.'}), 400

    try:
        # Connect to MySQL database
        conn = connect_db()
        cursor = conn.cursor()

        # SQL query to insert booking data into the database
        query = """
            INSERT INTO bookings (user_id, state, city, museum, visit_date, visit_time, num_people)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        """
        cursor.execute(query, (user_id, state, city, museum, visit_date, visit_time, num_people))

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
