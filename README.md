# QNinja

Repositório do projeto Questões Ninja da disciplina de ACE

[![lint Actions Status](https://github.com/JoaoG250/QNinja/workflows/lint/badge.svg)](https://github.com/JoaoG250/QNinja/actions)
[![tests Actions Status](https://github.com/JoaoG250/QNinja/workflows/tests/badge.svg)](https://github.com/JoaoG250/QNinja/actions)

### Cronograma do projeto no [Google Drive](https://drive.google.com/file/d/1z-n1bAOSL336MXD6hfc8JrPt8G1w0R12/view?usp=sharing)

### Padrões de codificação disponível no [Google Docs](https://docs.google.com/document/d/1Kgnp4kPGARULwjh5nZ_GrF9W1XJGsTinQJIpby38bcM/edit?usp=sharing)

### Documento de Requisitos disponível no [Google Docs](https://docs.google.com/document/d/1uhZ2ERMhCmfkMnRtPefBVvax73NMKlt90NKCI62kXSc/edit?usp=sharing)

### Diagramas do diagrams.net: [Casos de uso](https://drive.google.com/file/d/1txH0boAO5HV9gwl7TqHxOusv6qaU6w1I/view?usp=sharing), [Arquitetura](https://drive.google.com/file/d/1yzx9bYKrI4Wpoce2geb-lVZIYZlf0Zhu/view?usp=sharing), [Entidade Relacional](https://drive.google.com/file/d/19t1LrkhPxq-DqeLzGe7TshMS5fDVC1Mn/view?usp=sharing)

### Personas: [Usuários](https://drive.google.com/file/d/1HJ4ZTwZ3GxVBybxXACTXXrrfRjXBj9U7/view?usp=sharing), [Corretores](https://drive.google.com/file/d/1WNzJaGn7X0LJp0HvTXzesusdHhxXnb-O/view?usp=sharing)

### Outros Artefatos: [Proposta de Redação](https://drive.google.com/file/d/1tf72Gh6-W_7BcFJYwFvYLBBG1B8oXotW/view?usp=sharing), [Folha de Redação](https://drive.google.com/file/d/1qTcG7SKEdbVuDpBr94Rvg5RFhyPX_TZf/view?usp=sharing)

## Instruções para executar localmente

### Dependências

- Docker
- Docker Compose

### Instruções

1. Construa as imagens da aplicação: `docker-compose build`
1. Execute o setup inicial da api: `docker-compose run --rm api setup`
1. Execute o setup inicial do frontend: `docker-compose run --rm next setup`
1. Para carregar dados de teste no banco de dados: `docker-compose run --rm api python manage.py test_seed`
1. Inicie os containers em seu terminal: `docker-compose up`
1. Entre no navegador nos seguintes endereços:
   - Para acessar a aplicação django: http://localhost:8000
   - Para acessar a aplicação next: http://localhost:3000
   - Para acessar o schema da API: http://localhost:8000/api/schema/
