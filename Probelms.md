\- .env file overwrite or removed (no file on github)

&nbsp;	- .env.example in GitHub 

&nbsp;	- copied it to another folder outside app directory of remote server.

\- docker-compose.yml changes

&nbsp;	- .env from outside app directory: under config

&nbsp;	- container name for both app and db

\- app dependencies. 

&nbsp;	- npm i (doesn't install all packages - we must specify each)

&nbsp;	- npm i express dotenv pg

\- **Major problem!**

**- Rename ip in dash cloudflare after each instance restart** 
**- With permission issues; docker socket error: "docker.socket: Failed with result 'service-start-limit-hit". This results in "systemctl status systemd-resolved" = Failed**
	**- I decided to reboot - Didn't work. For now - reinstalling docker. Or, removing it and letting Ansible handle installation.**


### SECRETS MANAGEMENT

We can hide our use of variables completely by:
- Under inventory.yml:
	- key:"{{value}}"
- Under deploy-playbook.yml
	- Include key.
- Under .github/workflows/aws.yml
	- Where we start ansible i.e. ansible-playbook inventory.yml deploy-playbook.yml -e "PGUSER=${{ secrets.PGUSER }}"
	- This way, our code becomes secure and neat.
