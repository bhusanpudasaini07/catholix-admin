pipeline {
  agent any
  environment {
      scannerHome = tool 'SonarQubeScan'
      REGISTRY = 'registry.ekbana.net'
      HARBOR_NAMESPACE = "mtn-analytics"
      HARBOR_CREDENTIAL = credentials('mtn-inhouse')
      APP_NAME = getAppName(env.BRANCH_NAME)
      DIR_NAME = getDirName(env.BRANCH_NAME)
      SERVER_IP = getServerIp(env.BRANCH_NAME)
  }
  stages {
    stage('get_commit_msg') {
        steps {
          script {
            notifyStarted()
            passedBuilds = []
            lastSuccessfulBuild(passedBuilds, currentBuild);
            env.changeLog = getChangeLog(passedBuilds)
            echo "changeLog \n${env.changeLog}"
          }
        }
    }
    stage("Checkout code") {
      when {
        anyOf{
          branch 'dev';
          branch 'qa';
          branch 'uat';
        }
      }     
      steps {
          checkout scm
      }
    }
    stage('Analysis & Deploy') {
      parallel{
        stage('Build & Deploy') {   
          stages{
            stage("Build image") {
              when {
                anyOf{
                  branch 'dev';
                  branch 'qa';
                  branch 'uat';
                }
              }  
              steps {
                  sh 'docker build -t $REGISTRY/$HARBOR_NAMESPACE/$APP_NAME:SNAPSHOT-$BRANCH_NAME-$BUILD_NUMBER .'
              }
            }
            stage("Harbor login & Push image") {
              when {
                anyOf{
                  branch 'dev';
                  branch 'qa';
                  branch 'uat';
                }
              } 
              steps {
                  sh '''echo $HARBOR_CREDENTIAL_PSW | docker login $REGISTRY -u 'robot$mtn-analytics+inhouse' --password-stdin'''
                  sh 'docker push  $REGISTRY/$HARBOR_NAMESPACE/$APP_NAME:SNAPSHOT-$BRANCH_NAME-$BUILD_NUMBER'
                  sh 'docker rmi $REGISTRY/$HARBOR_NAMESPACE/$APP_NAME:SNAPSHOT-$BRANCH_NAME-$BUILD_NUMBER'
              }
            }
            stage('Deploy to server') {
              when {
                anyOf{
                  branch 'dev';
                  branch 'qa';
                  branch 'uat';
                }
              } 
              steps{
                script {
                  sshagent(['c1ef4eff-d399-4b1d-bfa9-038bafafdb04']) {
                  sh '''
                  ssh -tt -o StrictHostKeyChecking=no root@$SERVER_IP -p 1123 << EOF
                  cd $DIR_NAME; \
                  echo $HARBOR_CREDENTIAL_PSW | docker login $REGISTRY -u 'robot$mtn-analytics+inhouse' --password-stdin; \
                  docker pull  $REGISTRY/$HARBOR_NAMESPACE/$APP_NAME:SNAPSHOT-$BRANCH_NAME-$BUILD_NUMBER; \
                  docker-compose -f docker-compose.yml down; \
                  BUILD_NUMBER=$BUILD_NUMBER docker-compose -f docker-compose.yml up -d; \
                  docker image prune -a -f; \
                  exit
                  EOF '''
                  }
                }
              }    
            }
          }  
        }
      }
    }
  }
  post{
    success{
      notifySuccessful()
    }
    failure{
      notifyFailed()
    }
  }
}

def notifyStarted() {
mattermostSend (
  color: "#2A42EE",
  channel: 'mdm-expansion-jenkins',
  endpoint: 'https://ekbana.letsperk.com/hooks/7aw7rwik9preuxmhgyr7ntbe7r',
  message: "Build STARTED: ${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Link to build>)"
  )
}


def notifySuccessful() {
mattermostSend (
  color: "#00f514",
  channel: 'mdm-expansion-jenkins',
  endpoint: 'https://ekbana.letsperk.com/hooks/7aw7rwik9preuxmhgyr7ntbe7r',
  message: "Build SUCCESS: ${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Link to build>):\n${changeLog}"
  )
}

def notifyFailed() {
mattermostSend (
  color: "#e00707",
  channel: 'mdm-expansion-jenkins',
  endpoint: 'https://ekbana.letsperk.com/hooks/7aw7rwik9preuxmhgyr7ntbe7r',
  message: "Build FAILED: ${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Link to build>)"
  )
}
def lastSuccessfulBuild(passedBuilds, build) {
  if ((build != null) && (build.result != 'SUCCESS')) {
      passedBuilds.add(build)
      lastSuccessfulBuild(passedBuilds, build.getPreviousBuild())
   }
}

@NonCPS
def getChangeLog(passedBuilds) {
    def log = ""
    for (int x = 0; x < passedBuilds.size(); x++) {
        def currentBuild = passedBuilds[x];
        def changeLogSets = currentBuild.changeSets
        for (int i = 0; i < changeLogSets.size(); i++) {
            def entries = changeLogSets[i].items
            for (int j = 0; j < entries.length; j++) {
                def entry = entries[j]
                log += "* ${entry.msg} by ${entry.author} \n"
            }
        }
    }
    return log;
  }

def getDirName(branchName) {
    if("dev".equals(branchName)) {
        return "/usr/share/nginx/mtn-analytics/frontend/dev/";
    } else if("qa".equals(branchName)) {
        return "/var/www/mtn-analytics/frontend/qa/";
    } else if("uat".equals(branchName)) {
        return "/var/www/mtn-analytics/frontend/uat/";
    } else {
        return "/var/www/mtn-analytics/frontend/";
    }
}

def getAppName(branchName) {
    if("dev".equals(branchName)) {
        return "mtn-frontend-app";
    } else if ("qa".equals(branchName)) {
        return "mtn-frontend-app";
    } else if ("uat".equals(branchName)) {
        return "mtn-frontend-app";
    } else {
        return "mtn-frontend-app";
    }
}

def getServerIp(branchName) {
    if("dev".equals(branchName)) {
        return "110.44.123.47";
    } else if ("qa".equals(branchName)){
        return "20.224.68.171";
    } else if ("uat".equals(branchName)){
        return "20.224.68.171";
    } else {
        return "20.224.68.171";
    }
}
