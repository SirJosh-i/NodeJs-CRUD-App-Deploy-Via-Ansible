### Synchronize or rsync:
Encountered an error where ssh connection wouldn't establish.
Reason: ssh-multiplexing
- SSH-Multiplexing allowed tasks to reuse single persistent connection.
- This is used by default; Its fast because SSH doesn't need to re-authenticate and renegotiate every time.
  
#### Problem!
The problem began when my SSH path wasn't being used leading to "Public Key mismatch"

#### Why it happened?!
Because ssh-multiplexing (if turned on); Synchronize (that uses rsync) would spawn its own SSH process separately to that of Ansible. So, every time it was generating its own SSH and causing to failure.

### General Problems:
- Rename ip in dash cloudflare after each instance restart

### Environment file

- .env file overwrite or removed (no file on github)

	- .env.example in GitHub 

	- copied it to another folder outside app directory of remote server.

	- docker-compose.yml changes

	- .env from outside app directory: under config

- container name for both app and db

#### App dependencies. 

<pre> ```bash npm i (doesn't install all packages - we must specify each)
   npm i express dotenv pg ``` </pre>

### Major problem!

- docker socket error: "docker.socket: Failed with result 'service-start-limit-hit". This results in "systemctl status systemd-resolved" = Failed
 - TO resolve: ```systemctl restart systemd-resolved.```

#### Docker socket error - Handled:
- Reinstalling docker. Or, removing it and letting Ansible handle installation.

#### Unable to write in the directory:
- Couldn't remove: mount was ro; read only. Had to change using:
	``` sudo mount -o remount,rw /```


### SECRETS MANAGEMENT

We can hide our use of variables completely by:
- Under inventory.yml:
	- key:"{{value}}"
- Under deploy-playbook.yml
	- Include key.
- Under .github/workflows/aws.yml
	- Where we start ansible i.e. ansible-playbook inventory.yml deploy-playbook.yml -e "PGUSER=${{ secrets.PGUSER }}"
	- This way, our code becomes secure and neat.

### If you ever encounter: Error[111]:
- "msg": "Status code was -1 and not [200]: Request failed: <urlopen error [Errno 111] Connection refused>",
	- TRY RESTARTING NGINX!

	#### Fixed!
	- Handlers was tweaked by adding commands: systemctl restart nginx
