# kumojin-events

Kumojin Events is a project to add and list events internationally.
This repository is composed from a backend and frontend projects

## Getting started

### First setup

Open a terminal and go to the root directory od the project 
then run :
`sh build_all_dockers.sh <docker_repository>`
change <docker_repository> with your docker repository name;

That will construct and push the images (backend and frontend for the project).

### Second Step

#### Backend

run this cmd to run the container on docker locally: 
`docker run -p 8080:80 <image_name>`
change <image_name> with your docker image name;


### Third Step

#### Backend deployment on K8s locally

PS : on this directory you will find the k8s.yml file and the gihthub actions workflowd file.

Go to the file k8s.yml:
edit  `IMAGE_LABEL` and  `REPO_URL/kumonjievent:IMAGE_LABEL` with ur config

run this cmd : 
`kubectl apply -f ./k8s/k8s.yml`

check the result with : `kubectl get pods`
then : `kubectl get services`

to test it locally run this cmd
`kubectl expose deployment kumojin-event --type=LoadBalancer --name=kumojin-event2`


At the end delete 
`kubectl delete deployments kumojin-event`
`kubectl delete services kumojin-event`