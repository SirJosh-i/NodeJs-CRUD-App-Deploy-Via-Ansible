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


### SECRETS MANAGEMENT

We can hide our use of variables completely by:
- Under inventory.yml:
	- key:"{{value}}"
- Under deploy-playbook.yml
	- Include key.
- Under .github/workflows/aws.yml
	- Where we start ansible i.e. ansible-playbook inventory.yml deploy-playbook.yml -e "PGUSER=${{ secrets.PGUSER }}"
	- This way, our code becomes secure and neat.