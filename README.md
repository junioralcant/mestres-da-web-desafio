# Mestres da Web Desafio
O Projeto é uma API escrita em node.js para controle de estoque de um e-commerce. Onde o usuário administrador  pode cadastrar produtos, categorias e tamanhos (EX: P, M, G, 35, 36, 40). O usuário não administrador pode listar os produtos e fazer uma simulação de compra.


### Instalação:
Use o comando `yarn install` para instalar as dependências

Use o comando `yarn sequelize db:create` após configurar usuário e senha do banco de dados no arquivo de configuração  `database.js`

Use o comando `yarn sequelize db:migrate` para criar as tabelas no banco de dados

Use `yarn dev` para rodar a aplicação em modo de desenvolvimento

### Usuário:

Use o link `http://localhost:3333/users` para cadastrar um **Novo Usuário** Informe os seguintes dados:

```
{
	"name": "Admin",
	"email": "admin@gmail.com",
	"administrator": true,
	"password": "123456"
}
```

### Login:

Use o link `http://localhost:3333/sessions` para criar um token de **Autenticação do Usuário**. Informe os seguintes dados:
```
{
	"email": "admin@gmail.com",
	"password": "123456"

}
```

### Categorias:

Use o link `http://localhost:3333/types` para criar uma nova **Categoria**. Informe os seguintes dados:
```
{
	"name": "Camisa"
}
```

Use o link `http://localhost:3333/types` no método `get` para **Listar Categorias**.

Use o link `http://localhost:3333/types/1` no método `put` para **Alterar Categoria**. Informe os seguintes dados:
```
{
	"name": "Camisa Editada"
}
```

Use o link `http://localhost:3333/types/1` no método `delete` para **Deletar Categoria**.

### Tamanhos:

Use o link `http://localhost:3333/sizes` para criar um novo **Tamanho**. Informe os seguintes dados:
```
{
	"name": "P"
}
```

Use o link `http://localhost:3333/sizes` no método `get` para **Listar Tamanhos**.

Use o link `http://localhost:3333/sizes/1` no método `put` para **Alterar Tamanho**. Informe os seguintes dados:
```
{
	"name": "G"
}
```

Use o link `http://localhost:3333/sizes/1` no método `delete` para **Deletar Tamanho**.

### Produtos:

Use o link `http://localhost:3333/products` para criar um novo **Produto**. Informe os seguintes dados:
```
{
	"name": "Camisa Nike",
	"description": "Camisa Nike, a tendência quem cria é você",
	"price": 45,
	"types": [3,4],
	"sizes": [{"sizeId": 1, "amount": 10, "sku": "B1B00O"}, {"sizeId": 3, "amount": 10, "sku": "B1B001"}]
}
```

Use o link `http://localhost:3333/products` no método `get` para **Listar Produtos**.

Use o link `http://localhost:3333/products/1` no método `put` para **Alterar Produtos**. Informe os seguintes dados:
```
{
	"name": "Camisa Nike Editada",
	"description": "Camisa Nike, tendência quem cria é você",
	"price": 45,
}
```

Use o link `http://localhost:3333/products/1` no método `delete` para **Deletar Produtos**.


### Variações de Produto:

Use o link `http://localhost:3333/productstypessizes/1` (número do ID do produto na URL) para criar uma nova **Variação de Categoria e Tamanho**. Informe os seguintes dados:
```
{
	"typeId": 5,
	"sizeProperties": {"sizeId": 5, "amount": 6, "sku": "B34A8"}
}
```

Use o link `http://localhost:3333/productstypessizes/1` (número do ID do produto na URL) no método `put` para **Alterar Categoria e Tamanho**. Informe os seguintes dados:
```
{
	"typesId": 1,
	"sizeProperties": {"sizeId": 5, "sku": "B13323", "amount": 9}
}
```

Use o link `http://localhost:3333/productstypessizes/1` (número do ID do produto na URL) no método `delete` para **Deletar Tamanho e Categoria**. Informe os seguintes dados:
```
{
	"typeId": 4,
	"sizeId": 3
}
```
### Simulação de Venda:

Use o link `http://localhost:3333/sales` para fazer uma nova **Venda**. Informe os seguintes dados:

```
{
	"saleProducts": [{"sizeId": 5, "amount": 1, "productId": 1}, {"sizeId": 3, "amount": 1, "productId": 4}]
}
```

Use o link `http://localhost:3333/sales` no método `get` para **Listar Vendas**.

