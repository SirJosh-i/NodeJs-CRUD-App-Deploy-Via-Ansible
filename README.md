# NodeJs CRUD App Deploy Via Ansible

## Development of the App:
### Overview:
CRUD API was crafted using NodeJs and Postgres. All necessary files are held inside [app](https://github.com/SirJosh-i/NodeJs-CRUD-App-Deploy-Via-Ansible/tree/master/app).

### Pre-requisites:
- NodeJs
- Docker
- Docker compose

### Folder Structure
![tree directory](https://github.com/SirJosh-i/NodeJs-CRUD-App-Deploy-Via-Ansible/blob/master/images/tree.png)

### What I did - Simplified in points:
- Created an app.js highlighting a basic CRUD API and wrote db.js to handle connection between my app and the database.
- I wrote a simple [Dockerfile](https://github.com/SirJosh-i/NodeJs-CRUD-App-Deploy-Via-Ansible/blob/master/app/Dockerfile) and [docker-compose.yml](https://github.com/SirJosh-i/NodeJs-CRUD-App-Deploy-Via-Ansible/blob/master/app/docker-compose.yml).
- I created a lightsail instance, copied the folder [app](https://github.com/SirJosh-i/NodeJs-CRUD-App-Deploy-Via-Ansible/tree/master/app) to the instance.
  - This was performed to verify if the connection between app and the db is healthy or not.
  - Now, nginx was installed - exposing port carelessly was the last thing I wanted to do.
    - I reverse proxied app to my domain and viewed results - 200 ok
- Now, to avoid manual command run in the instance, I used Ansible.

## Deployment of the App:
### Overview:
GitHub Actions was used to deploy to the lightsail instance and Ansible was setup for automation. 

### Pre-requisites:
- GitHub
- Knowledge on GitHub Actions
- Ansible

### What I did - Simplified in points:
- Wrote a [inventory.yml](https://github.com/SirJosh-i/NodeJs-CRUD-App-Deploy-Via-Ansible/blob/master/inventory.yml) and [deploy-playbook.yml](https://github.com/SirJosh-i/NodeJs-CRUD-App-Deploy-Via-Ansible/blob/master/deploy-playbook.yml)
- In inventory.yml:
  - Hostname was specified and environment variable to be used in the playbook was defined.
- In deploy-playbook.yml:
  - Tasks were defined; This means any manual task from installing a package on lightsail to performing certain tasks were written down.
    - For my own sanity, I created a docker-installation script: And further included in the playbook for the task to run that script.
- Now, for a fresh instance with no nginx - I wrote a [app.conf](https://github.com/SirJosh-i/NodeJs-CRUD-App-Deploy-Via-Ansible/blob/master/app.conf) file then, as shown in the playbook; copied it to nginx directory after the installation of nginx.

### Logging and Monitoring:
🚧 Currently In Progress
