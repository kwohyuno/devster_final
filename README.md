# Devster - Online Community for Future Developers

## 📖 About

Devster is a comprehensive online community platform designed for developers and tech enthusiasts. It provides a space for developers to connect, share knowledge, find job opportunities, and collaborate on projects. The platform features various boards for different purposes including job postings, academy reviews, Q&A, and free discussions.

## 🚀 Features

### Core Features
- **User Authentication & Authorization**
  - JWT-based authentication
  - OAuth2 integration (Naver, Kakao)
  - Social login support
  - Role-based access control

- **Community Boards**
  - **Job Board (Hire Board)**: Job postings and applications
  - **Academy Board**: Educational institution reviews and ratings
  - **Q&A Board**: Technical questions and answers
  - **Free Board**: General discussions
  - **Review Board**: Product and service reviews
  - **Notice Board**: Platform announcements

- **User Management**
  - User profiles with customizable avatars
  - Resume management system
  - Company member profiles
  - Messaging system between users

- **Interactive Features**
  - Like/Unlike posts and comments
  - Bookmark functionality
  - Real-time messaging
  - File upload support (up to 50MB)
  - Image cropping and editing

- **Advanced Features**
  - AWS S3 integration for file storage
  - Email notifications
  - SMS integration via Naver Cloud Platform
  - WebSocket support for real-time communication

## 🛠 Technology Stack

### Backend
- **Framework**: Spring Boot 2.7.13
- **Language**: Java 11
- **Database**: MySQL
- **ORM**: JPA/Hibernate, MyBatis
- **Security**: Spring Security with JWT
- **Build Tool**: Gradle
- **Container**: Docker

### Frontend
- **Framework**: React 18.2.0
- **State Management**: Redux Toolkit
- **UI Library**: Material-UI (MUI)
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Real-time**: WebSocket (STOMP)

### External Services
- **Cloud Storage**: AWS S3
- **OAuth Providers**: Naver, Kakao
- **SMS Service**: Naver Cloud Platform SENS
- **Translation**: Naver Cloud Platform Translation

## 📁 Project Structure

```
devster_final/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   ├── com/example/devsterfinal/
│   │   │   ├── data/
│   │   │   │   ├── controller/     # REST API controllers
│   │   │   │   ├── entity/         # JPA entities
│   │   │   │   ├── dto/           # Data Transfer Objects
│   │   │   │   ├── repository/    # JPA repositories
│   │   │   │   ├── service/       # Business logic
│   │   │   │   └── mapper/        # MyBatis mappers
│   │   │   ├── jwt/              # JWT configuration
│   │   │   ├── oauth2/           # OAuth2 configuration
│   │   │   ├── social/           # Social login
│   │   │   └── naver/            # Naver API integration
│   │   ├── resources/
│   │   │   ├── static/           # Built React app
│   │   │   ├── mapper/           # MyBatis XML files
│   │   │   └── application.yml   # Configuration
│   │   └── reactJs/
│   │       └── my-app/           # React frontend
│   │           ├── src/
│   │           │   ├── components/ # Reusable components
│   │           │   ├── pages/      # Page components
│   │           │   ├── containers/ # Container components
│   │           │   ├── redux/      # Redux store
│   │           │   ├── router/     # Routing configuration
│   │           │   └── api/        # API calls
│   │           └── public/         # Static assets
│   └── test/                      # Test files
├── build.gradle                   # Gradle build configuration
├── Dockerfile                     # Docker configuration
└── README.md                      # This file
```

## 🚀 Getting Started

### Prerequisites
- Java 11 or higher
- Node.js 18.16.0 or higher
- MySQL 5.7 or higher
- Gradle 7.x or higher

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/kwohyuno/devster_final.git
   cd devster_final
   ```

2. **Configure Database**
   - Create a MySQL database
   - Update `src/main/resources/application.yml` with your database credentials

3. **Configure External Services**
   - Set up AWS S3 bucket and credentials
   - Configure Naver OAuth application
   - Set up Kakao OAuth application
   - Configure Naver Cloud Platform services (SMS, Translation)

4. **Build and Run**
   ```bash
   # Build the project
   ./gradlew build
   
   # Run the application
   ./gradlew bootRun
   ```

### Frontend Setup

1. **Navigate to React app directory**
   ```bash
   cd src/main/reactJs/my-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

### Docker Deployment

1. **Build the Docker image**
   ```bash
   docker build -t devster-final .
   ```

2. **Run the container**
   ```bash
   docker run -p 443:443 devster-final
   ```

## 🔧 Configuration

### Environment Variables
The application uses several configuration files:
- `application.yml`: Main configuration
- `application-oauth.properties`: OAuth2 settings
- `naver.properties`: Naver API settings
- `email.properties`: Email configuration

### SSL Configuration
The application runs on HTTPS (port 443) with SSL certificate. Make sure to:
- Place your SSL certificate in `src/main/resources/keystore.p12`
- Update the keystore password in `application.yml`

## 📱 API Endpoints

The application provides RESTful APIs for:
- User management (`/api/member/*`)
- Board operations (`/api/board/*`)
- File uploads (`/api/upload/*`)
- Messaging (`/api/message/*`)
- Authentication (`/api/auth/*`)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Hyunoh Kwon** - *Initial work* - [kwohyuno](https://github.com/kwohyuno)

## 🙏 Acknowledgments

- Spring Boot team for the excellent framework
- Material-UI team for the beautiful React components
- Naver Cloud Platform for external services
- AWS for cloud infrastructure

---

**Devster** - Connecting developers, building the future together! 🚀
