pipeline {
  agent any
  environment {
    DOCKER_IMAGE = "santhosh9405/frontend"
    KUBECONFIG = credentials('minikube')
  }
  stages {
    stage('Build Docker Image') {
      steps {
        script {
          def commitHash = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
          docker.build("${DOCKER_IMAGE}:${commitHash}")
          docker.build("${DOCKER_IMAGE}:green")
        }
      }
    }

    stage('Push Docker Image') {
      steps {
        withDockerRegistry(credentialsId: 'docker_cred') {
          sh "docker push ${DOCKER_IMAGE}:green"
        }
      }
    }

    stage('Deploy Green') {
      steps {
        sh 'kubectl apply -f k8s/deployment-green.yaml'
      }
    }

    stage('Verify Green Deployment') {
      steps {
        input message: 'Is Green version working as expected?'
      }
    }

    stage('Switch Traffic to Green') {
      steps {
        script {
          sh 'kubectl patch svc myapp-service -p \'{"spec": {"selector": {"app": "myapp", "version": "green"}}}\''
        }
      }
    }

    stage('Cleanup Blue') {
      steps {
        sh 'kubectl delete deployment app-blue || true'
      }
    }
  }
}
