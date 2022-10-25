![](https://i.imgur.com/xG74tOh.png)

# Exercícios - Integração com API de terceiros

## Exercícios de classe 🏫

***1. Coletando dados de empresas***

Foi solicitado que fosse criada uma API para descobrir e guardar dados de empresas como ano de fundação, ramo, número de funcionários, cidade, país e etc.

Sem saber como resolver a necessidade, procuramos Dina que sempre tem uma ideia criativa de como resolver problemas! =D

Dina nos contou que conhece uma API pronta que consegue devolver essas informações a partir dos domínios dos sites das empresas, que é a **Company Enrichment API** do site **Abstract API** (https://www.abstractapi.com/api/company-enrichment), que possui apenas 1 detalhe: esta API exige **autenticação**. Mas isso não é problema pois nossa equipe sabe como autenticar em api de terceiros!!! =DDD

Após confirmar com o solicitante, resolvemos utilizar a sugestão de Dina. Para isso criaremos uma API que autentica e consulta os dados na API externa a partir do domínio requisitado à nossa API. Ao conseguir um resultado da API externa, guarda em um array em arquivo **JSON** chamado **empresas.json**.

Para garantir a performance utilizaremos programação assíncrona tanto para consultar a API externa com axios quanto para ler / escrever o arquivo JSON.

Vamos ao funcionamento da nossa API:

**GET /empresas**

Nossa API deverá possuir apenas 1 recurso **empresas** que deverá ser acessado através do endereço http://localhost:8000/empresas.
Este recurso receberá apenas requisições GET e deverá possuir um parâmetro obrigatório na rota (path) chamado **dominioEmpresa**.

Ao receber o domínio da empresa pelo parâmetro deveremos enviá-lo à API externa para consultar os dados da empresa.
O endereço da API externa que devemos utilizar para isso é:
```
https://companyenrichment.abstractapi.com/v1/
```
No qual acrescentaremos dois parâmetros query:
* **api_key**: utilizada para a autenticação e deverá possuir como valor a seguinte chave de teste: **34a8499969c4401daf6a685935323c1d**
* **domain**: onde deveremos enviar o domínio da empresa que recebemos no parâmetro da nossa API.

O objeto que será retornado da API externa será o objeto que retornaremos na nossa API! =D

Mas antes de retorná-lo, deveremos guardar o que encontramos no array do arquivo **empresas.json**. Mas para isso, foi solicitada uma regra:
* Guardar apenas os resultados cujo nome da empresa (propriedade **name** do objeto retornado) venha preenchido corretamente (não venha com null ou undefined).
Portanto, guardaremos no array apenas os objetos das empresas que sejam retornadas com o nome preenchido.

E independente de como o dado seja retornado da API externa, sempre retornaremos o exato mesmo objeto no response da nossa API.

Teste para algumas empresas que você conheça o domínio e não esqueça de verificar se o arquivo JSON está sendo preenchido corretamente! =)

---

***2. Referendo por localização***


Neste exercício será necessário criar uma API para registrar votos de uma votação por localização. 

A ideia é que em uma votação, a API possa verificar se o usuário que está enviando o voto está realmente no país correto da votação antes de registrar o voto.

Para isto utilizaremos uma API externa **IP Geolocation API** da **Abstract API** (https://www.abstractapi.com/ip-geolocation-api) que exige **autenticação**.

**Buscando a localização por IP na API externa**

Para encontrar a localização a partir de um IP utilizando a API mencionada acima deveremos utilizar o seguinte endereço:

```
https://ipgeolocation.abstractapi.com/v1/
```
Passando dois parâmetros do tipo **query**:
* **api_key**: que deverá receber como valor a chave de teste **58cafbe4558f425d8e8c731e3b26fbe0** para a autenticação
* **ip_address**: que deverá receber o IP do usuário, por exemplo: **192.168.0.1**

**Obs.:** Em um caso real, o IP seria identificado diretamente da requisição, mas isso só seria possível com uma API exposta na internet. Portanto, para facilitar, receberemos o IP do usuário por parâmetro, assim como receberemos o país onde ele se encontra também por parâmetro.

Dito isto, nossa API deverá possuir um único recurso chamado **votacao** que receberá dois parâmetros obrigatórios na rota (path): **pais** e **ip**.

**POST /votacao/:pais/:ip**

Este nosso recurso deverá estar disponível no endereço http://localhost:8000/votacao, deverá receber apenas requisições **POST** e deverá receber dois parâmetros do tipo path (params) obrigatórios:

* **pais**: deverá receber o nome do país em inglês ("Brazil", com "z", por exemplo) onde está acontecendo o referendo.
* **ip**: deverá receber o endereço IP do usuário que está enviando o voto.

Além dos parâmetros, deverá também ser enviado no corpo (body) da requisição, um objeto contendo uma propriedade **voto** que deve possuir valor booleano **true** ou **false**, representando respectivamente **sim** ou **nao** para o referendo. Portanto o corpo da nossa requisição deverá seguir o formato:

```json
{
    "voto": true
}
```

O IP recebido deverá ser enviado à API externa. Após receber o retorno da API externa, **caso o IP não seja válido**, deverá ser retornado ao usuário da nossa API um response com **status 400 (Bad Request)** e mensagem apropriada informando que o IP enviado não é válido.

Caso **o retorno** da API externa **seja válido**, deveremos selecionar a propriedade **country** deste retorno e comparar com o valor do parâmetro **pais** informado pelo nosso usuário. Caso sejam iguais, deveremos considerar o voto válido, caso não sejam, deveremos retornar um response com **status 400 (Bad Request)** informando que o IP enviado não coincide com o país da votação.

**Voto Válido**

Após validar o país da localização do endereço IP, deveremos adicionar o voto em um **array** que deverá existir em um arquivo **votos.json** em nosso servidor. 

Para adicionar o voto, deveremos criar um objeto que contenha duas propriedades: o **ip** informado pelo usuário e o **voto** (true ou false). Portanto deverá seguir o formato:

```json
{
    "ip": "200.45.187.22",
    "voto": false
}
```

**Para testar**

Para testar nossa API, sugiro que seja anotado alguns endereços IPs do mesmo país para podermos simular alguns diferentes votos verificando se todos serão validados e irão para o arquivo JSON. Sugiro que você anote o seu IP e solicite o IP de amigos ou colegas para a realização dos testes.

Podemos facilmente descobrir nosso IP na internet acessando:

http://www.meuip.com/

**EXTRA (para fazer caso sobre tempo na aula)**

Crie uma nova rota GET para que seja possível consultar todos os votos. A função para esta rota deverá ler todo o array do arquivo **votos.json** e retornar no response da requisição.

---

###### tags: `nodeJS` `exercício de classe` `express` `http` `api` `integracao com api` `api de terceiros` `autenticacao`
