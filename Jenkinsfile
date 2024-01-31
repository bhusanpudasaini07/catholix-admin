pipeline {
    agent any
    tools {nodejs "nodejs-16"}
    environment {
        APP_NAME = "rp-revamp-frontend"
        DIR_NAME = getDirName(env.BRANCH_NAME)
        SERVER_IP = getServerIp(env.BRANCH_NAME)
        PROCESS_NAME = getProcessName(env.BRANCH_NAME)
        PM2_NAME = getPM2Name(env.BRANCH_NAME)
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
        stage('Analysis & Deploy') {     
                        steps{
                        script {
                            sshagent(['72c3455a-de8d-4b39-9f02-771ddb2fdf00']) {
                            sh '''
                            ssh -tt -o StrictHostKeyChecking=no root@$SERVER_IP -p 3030 << EOF
                            cd $DIR_NAME; \
                            git pull origin $PROCESS_NAME; \
                            pnpm i; \
                            pnpm build; \
                            pm2 restart $PM2_NAME; \
                            exit
                        EOF '''
                        }
                        }
                    }    
                    
  
        
    }

    }

    post{
      success{
        //script {
          //if (env.BRANCH_NAME == 'dev' || env.BRANCH_NAME == 'qa' || env.BRANCH_NAME == 'uat' )
            notifySuccessful()
        //}
      }
      failure{
        notifyFailed()
      }
      aborted{
        notifyAborted()
      }
    }
}

def notifyStarted() {
mattermostSend (
  color: "#2A42EE",
  channel: 'rp-revamp-jenkins',
  endpoint: 'https://ekbana.letsperk.com/hooks/muepfmt91brnmnqym44ce7kpda',
  message: "Build STARTED: ${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Link to build>)"
  )
}


def notifySuccessful() {
mattermostSend (
  color: "#00f514",
  channel: 'rp-revamp-jenkins',
  endpoint: 'https://ekbana.letsperk.com/hooks/muepfmt91brnmnqym44ce7kpda',
  message: "Build SUCCESS: ${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Link to build>):\n${changeLog}"
  )
}

def notifyFailed() {
mattermostSend (
  color: "#e00707",
  channel: 'rp-revamp-jenkins',
  endpoint: 'https://ekbana.letsperk.com/hooks/muepfmt91brnmnqym44ce7kpda',
  message: "Build FAILED: ${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Link to build>)"
  )
}

def notifyAborted(){
mattermostSend (
  color: "#e00707",
  channel: 'rp-revamp-jenkins',
  endpoint: 'https://ekbana.letsperk.com/hooks/muepfmt91brnmnqym44ce7kpda',
  message: "Build ABORTED: ${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Link to build>)"
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


//Getting server ip for respective branches
 def getServerIp(branchName) {
    if("main".equals(branchName)) {
        return "157.245.148.131";
    }
    if("dev".equals(branchName)) {
        return "157.245.148.131";
    }
    if("qa".equals(branchName)) {
        return "157.245.148.131";
    }
    if("uat".equals(branchName)) {
        return "157.245.148.131";
    }
    if("dev-ek".equals(branchName)) {
        return "157.245.148.131";
    }
    else {
        return "157.245.148.131";
    }//can use comment to comment else and run like the pm2 in the last 
 }


//Getting branch name for respective branches
def getDirName(branchName) {
    if("dev".equals(branchName)) {
        return "/var/www/rp/frontend";
    } else if ("qa".equals(branchName)) {
        return "not-given";
    } else if ("uat".equals(branchName)) {
        return "not-given";
    } else {
        return "not-given";
    }
}


//Getting branch name for git branch
def getProcessName(branchName) {
    if("dev".equals(branchName)) {
        return "dev";
    } else if ("qa".equals(branchName)) {
        return "qa";
    } else if ("uat".equals(branchName)) {
        return "not-given";
    } else {
        return "not-given";
    }
}


//Getting branch name for PM2 restart
def getPM2Name(branchName) {
    if("dev".equals(branchName)) {
        return "rp-dev-frontend";
    } else if ("qa".equals(branchName)) {
        return "not-given";
    } /*else if ("uat".equals(branchName)) {
        return "uat_frontend";
    } else {
        return "not-given";
    }*/
}
