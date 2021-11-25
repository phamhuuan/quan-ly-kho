# API Documentation

## Initial accounts

| Email                       | Password |
| --------------------------- | -------- |
| dataholicguy@gmail.com      | 12345678 |
| longngodaugo.1202@gmail.com | 12345678 |

## Base URL
- https://quan-ly-kho-api.vercel.app/

## List of endpoints

| Method | Path | Description |
| ------ | ---- | ----------- |
| POST | /api/authentication/login | [Login](#Login) |
| DELETE | /api/authentication/logout | [Logout](#Logout) |
| PUT | /api/authentication/change-password | [Change password](#Change-password) |
| GET | /api/authentication/check-token | [Check token](#Check-token) |
| POST | /api/authentication/forgot-password | [Forgot password](#Forgot-password) |
| POST | /api/suppliers | [Create supplier](#Create-supplier) |
| GET | /api/suppliers | [Get list of suppliers](#Get-list-of-suppliers) |
| GET | /api/suppliers/:id | [Get supplier](#Get-supplier) |
| PUT | /api/suppliers/:id | [Update supplier](#Update-supplier) |
| DELETE | /api/suppliers/:id | [Delete supplier](#Delete-supplier) |
| POST | /api/products | [Create product](#Create-product) |
| GET | /api/products | [Get list of products](#Get-list-of-products) |
| GET | /api/products/:id | [Get product](#Get-product) |
| PATCH | /api/products/:id | [Update product](#Update-product) |
| DELETE | /api/products/:id | [Delete product](#Delete-product) |
| POST | /api/warehouse/import | [Import warehouse](#Import-warehouse) |
| GET | /api/warehouse/import | [Get list of import warehouse](#Get-list-of-import-warehouse) |
| POST | /api/warehouse/export | [Export warehouse](#Export-warehouse) |
| GET | /api/warehouse/export | [Get list of export warehouse](#Get-list-of-export-warehouse) |

## Authentication

### Login

[Back to top](#API-Documentation)

- URL: https://quan-ly-kho-api.vercel.app/api/authentication/login
- Method: POST
- Body:
```json
{
	"email": "abc@example.com",
	"password": "12345678"
}
```
- Response:
	- 200:
		```ts
		data: {
			message: "Login successfully",
			user: {
				_id: "user_id",
				email: "abc@example.com",
				avatar: "avatar-url" | undefined,
			}
			token: "token-string",
		},
		```
	- 400:
		```ts
		data: {
			message: "Please provide email and password",
		},
		```
	- 403:
		```ts
		data: {
			message: "Wrong password",
		},
		```
	- 404:
		```ts
		data: {
			message: "User not found",
		},
		```
	- 500:
		```ts
		data: {
			message: "Internal server error",
		},
		```

### Logout

[Back to top](#API-Documentation)

- URL: https://quan-ly-kho-api.vercel.app/api/authentication/logout
- Method: DELETE
- Header: Authorization: Bearer token-string
- Response:
	- 200:
		```ts
		data: {
			message: "Logout successfully",
		},
		```
	- 401:
		```ts
		data: {
			message: "Please login first",
		},
		```
	- 404:
		```ts
		data: {
			message: "User not found",
		},
		```
	- 500:
		```ts
		data: {
			message: "Internal server error",
		},
		```

### Change password

[Back to top](#API-Documentation)

- URL: https://quan-ly-kho-api.vercel.app/api/authentication/change-password
- Method: PUT
- Header: Authorization: Bearer token-string
- Body:
	```json
	{
		"oldPassword": "12345678",
		"newPassword": "12345678"
	}
	```
- Response:
	- 200:
		```ts
		data: {
			message: "Change password successfully",
		},
		```
	- 400:
		```ts
		data: {
			message: "Please provide old password and new password",
		},
		```
	- 401:
		```ts
		data: {
			message: "Please login first",
		},
		```
	- 403:
		```ts
		data: {
			message: "Wrong password",
		},
		```
	- 404:
		```ts
		data: {
			message: "User not found",
		},
		```
	- 500:
		```ts
		data: {
			message: "Internal server error",
		},
		```

### Check token

[Back to top](#API-Documentation)

- URL: https://quan-ly-kho-api.vercel.app/api/authentication/check-token
- Method: GET
- Header: Authorization: Bearer token-string
- Response:
	- 200:
		```ts
		data: {
			message: "Check token successfully",
			user: {
				_id: "user-id",
				email: "abc@example.com",
				avatar: "avatar-url" | undefined,
			}
		},
		```
	- 401:
		```ts
		data: {
			message: "Please login first",
		},
		```
	- 404:
		```ts
		data: {
			message: "User not found",
		},
		```
	- 500:
		```ts
		data: {
			message: "Internal server error",
		},
		```

### Forgot password

[Back to top](#API-Documentation)

- URL: https://quan-ly-kho-api.vercel.app/api/authentication/forgot-password
- Method: POST
- Body:
	```json
	{
		"email": "abc@example.com"
	}
	```
- Response:
	- 200:
		```ts
		data: {
			message: "Forgot password successfully",
		},
		```
	- 400:
		```ts
		data: {
			message: "Please provide email",
		},
		```
	- 404:
		```ts
		data: {
			message: "User not found",
		},
		```
	- 500:
		```ts
		data: {
			message: "Internal server error",
		},
		```

### Create supplier

[Back to top](#API-Documentation)

- URL: https://quan-ly-kho-api.vercel.app/api/suppliers
- Method: POST
- Header: Authorization: Bearer token-string
- Body:
	```json
	{
		"name": "ABC"
	}
	```
- Response:
	- 201:
		```ts
		data: {
			message: "Create supplier successfully",
			supplier: {
				_id: "supplier-id",
				name: "ABC",
			}
		},
		```
	- 400:
		```ts
		data: {
			message: "Please provide name",
		},
		```
	- 401:
		```ts
		data: {
			message: "Please login first",
		},
		```
	- 409:
		```ts
		data: {
			message: "Supplier already exists",
		},
		```
	- 500:
		```ts
		data: {
			message: "Internal server error",
		},
		```

### Get list of suppliers

[Back to top](#API-Documentation)

- URL: https://quan-ly-kho-api.vercel.app/api/suppliers
- Method: GET
- Header: Authorization: Bearer token-string
- Response:
	- 200:
		```ts
		data: {
			message: "Get list of suppliers successfully",
			suppliers: [
				{
					_id: "supplier-id",
					name: "ABC",
				},
				{
					_id: "supplier-id",
					name: "ABC",
				},
			],
		},
		```
	- 401:
		```ts
		data: {
			message: "Please login first",
		},
		```
	- 500:
		```ts
		data: {
			message: "Internal server error",
		},
		```

### Get supplier

[Back to top](#API-Documentation)

- URL: https://quan-ly-kho-api.vercel.app/api/suppliers/supplier-id
- Method: GET
- Header: Authorization: Bearer token-string
- Response:
	- 200:
		```ts
		data: {
			message: "Get supplier successfully",
			supplier: {
				_id: "supplier-id",
				name: "ABC",
			},
		},
		```
	- 401:
		```ts
		data: {
			message: "Please login first",
		},
		```
	- 404:
		```ts
		data: {
			message: "Supplier not found",
		},
		```
	- 500:
		```ts
		data: {
			message: "Internal server error",
		},
		```

### Update supplier

[Back to top](#API-Documentation)

- URL: https://quan-ly-kho-api.vercel.app/api/suppliers/supplier-id
- Method: PUT
- Header: Authorization: Bearer token-string
- Body:
	```json
	{
		"name": "ABC"
	}
	```
- Response:
	- 200:
		```ts
		data: {
			message: "Update supplier successfully",
			supplier: {
				_id: "supplier-id",
				name: "ABC",
			},
		},
		```
	- 400:
		```ts
		data: {
			message: "Please provide name",
		},
		```
	- 401:
		```ts
		data: {
			message: "Please login first",
		},
		```
	- 404:
		```ts
		data: {
			message: "Supplier not found",
		},
		```
	- 500:
		```ts
		data: {
			message: "Internal server error",
		},
		```

### Delete supplier

[Back to top](#API-Documentation)

- URL: https://quan-ly-kho-api.vercel.app/api/suppliers/supplier-id
- Method: DELETE
- Header: Authorization: Bearer token-string
- Response:
	- 200:
		```ts
		data: {
			message: "Delete supplier successfully",
		},
		```
	- 401:
		```ts
		data: {
			message: "Please login first",
		},
		```
	- 404:
		```ts
		data: {
			message: "Supplier not found",
		},
		```
	- 500:
		```ts
		data: {
			message: "Internal server error",
		},
		```

### Create product

[Back to top](#API-Documentation)

- URL: https://quan-ly-kho-api.vercel.app/api/products
- Method: POST
- Header: Authorization: Bearer token-string
- Body:
	```json
	{
		"name": "ABC",
		"supplierId": "supplier-id"
	}
	```
- Response:
	- 201:
		```ts
		data: {
			message: "Create product successfully",
			product: {
				_id: "product-id",
				name: "ABC",
				supplierId: "supplier-id",
				supplierName: "ABC",
			},
		},
		```
	- 400:
		```ts
		data: {
			message: "Please provide name and supplierId",
		},
		```
	- 401:
		```ts
		data: {
			message: "Please login first",
		},
		```
	- 404:
		```ts
		data: {
			message: "Supplier not found",
		},
		```
	- 409:
		```ts
		data: {
			message: "Product already exists",
		},
		```
	- 500:
		```ts
		data: {
			message: "Internal server error",
		},
		```

### Get list of products

[Back to top](#API-Documentation)

- URL: https://quan-ly-kho-api.vercel.app/api/products
- Method: GET
- Header: Authorization: Bearer token-string
- Parameter:
	- supplierId: string
		- Optional
		- Filter by supplier id
	- page: number
		- Optional
		- Page number
		- Default: 1
	- limit: number
		- Optional
		- Limit number of products per page
		- Default: no limit
	- max_amount: number
		- Optional
		- Filter by max amount
		- Default: no limit
- Response:
	- 200:
		```ts
		data: {
			message: 'Get list of products successfully',
			products: [
				{
					_id: "product-id",
					name: "ABC",
					supplierId: "supplier-id",
					supplierName: "ABC",
					amount: 0,
				},
				{
					_id: "product-id",
					name: "ABC",
					supplierId: "supplier-id",
					supplierName: "ABC",
					amount: 0,
				},
			],
			totalPage: 1,
			totalProduct: 2,
			page: 1,
		},
		```
	- 400:
		```ts
		data: {
			message: "Invalid parameter",
		},
		```
	- 401:
		```ts
		data: {
			message: "Please login first",
		},
		```
	- 404:
		```ts
		data: {
			message: "Supplier not found",
		},
		```
	- 500:
		```ts
		data: {
			message: "Internal server error",
		},
		```

### Get product

[Back to top](#API-Documentation)

- URL: https://quan-ly-kho-api.vercel.app/api/products/product-id
- Method: GET
- Header: Authorization: Bearer token-string
- Response:
	- 200:
		```ts
		data: {
			message: "Get product successfully",
			product: {
				_id: "product-id",
				name: "ABC",
				supplierId: "supplier-id",
				supplierName: "ABC",
				amount: 0,
			},
		},
		```
	- 401:
		```ts
		data: {
			message: "Please login first",
		},
		```
	- 404:
		```ts
		data: {
			message: "Product not found",
		},
		```
	- 500:
		```ts
		data: {
			message: "Internal server error",
		},
		```

### Update product

[Back to top](#API-Documentation)

- URL: https://quan-ly-kho-api.vercel.app/api/products/product-id
- Method: PATCH
- Header: Authorization: Bearer token-string
- Body:
	```json
	{
		"name": "ABC",
		"supplierId": "supplier-id"
	}
	```
	or
	```json
	{
		"name": "ABC",
	}
	```
	or
	```json
	{
		"supplierId": "supplier-id"
	}
	```
- Response:
	- 200:
		```ts
		data: {
			message: "Update product successfully",
		},
		```
	- 401:
		```ts
		data: {
			message: "Please login first",
		},
		```
	- 404:
		```ts
		data: {
			message: "Product not found",
		},
		```
		or
		```ts
		data: {
			message: "Supplier not found",
		},
		```
	- 409:
		```ts
		data: {
			message: "Product already exists",
		},
		```
	- 500:
		```ts
		data: {
			message: "Internal server error",
		},
		```

### Delete product

[Back to top](#API-Documentation)

- URL: https://quan-ly-kho-api.vercel.app/api/products/product-id
- Method: DELETE
- Header: Authorization: Bearer token-string
- Response:
	- 200:
		```ts
		data: {
			message: "Delete product successfully",
		},
		```
	- 401:
		```ts
		data: {
			message: "Please login first",
		},
		```
	- 404:
		```ts
		data: {
			message: "Product not found",
		},
		```
	- 500:
		```ts
		data: {
			message: "Internal server error",
		},
		```

### Import warehouse

[Back to top](#API-Documentation)

- URL: https://quan-ly-kho-api.vercel.app/api/warehouses/import
- Method: POST
- Header: Authorization: Bearer token-string
- Body:
	```json
	{
		"productId": "product-id",
		"supplierId": "supplier-id",
		"amount": 0
	}
	```
- Response:
	- 201:
		```ts
		data: {
			message: "Import warehouse successfully",
			importInformation: {
				_id: "import-id",
				productId: "product-id",
				productName: "ABC",
				supplierId: "supplier-id",
				supplierName: "ABC",
				amount: 0,
			}
		},
		```
	- 401:
		```ts
		data: {
			message: "Please login first",
		},
		```
	- 404:
		```ts
		data: {
			message: "Product not found",
		},
		```
		or
		```ts
		data: {
			message: "Supplier not found",
		},
		```
	- 500:
		```ts
		data: {
			message: "Internal server error",
		},
		```

### Get list of import warehouse

[Back to top](#API-Documentation)

- URL: https://quan-ly-kho-api.vercel.app/api/warehouses/import
- Method: GET
- Header: Authorization: Bearer token-string
- Parameter:
	- supplierId: string
		- Optional
		- Filter by supplier id
	- page: number
		- Optional
		- Page number
		- Use with type = all
	- limit: number
		- Optional
		- Limit number of products per page
		- Default: no limit
		- Use with type = all
	- type: string
		- Optional
		- Filter by type
		- Default: all
		- Allowed values:
			- all
			- last-month
			- last-week
- Response:
	- 200:
		```ts
		// If type = all
		data: {
			products: [
				{
					_id: "import-id",
					productId: "product-id",
					productName: "ABC",
					supplierId: "supplier-id",
					supplierName: "ABC",
					time: 1637744085913,
					amount: 0,
				},
				{
					_id: "import-id",
					productId: "product-id",
					productName: "ABC",
					supplierId: "supplier-id",
					supplierName: "ABC",
					time: 1637744085913,
					amount: 0,
				},
			],
			totalProduct: 2,
			totalPage: 1,
			page: 1,
		},
		```
		or
		```ts
		// If type = last-month || last-week
		data: {
			products: [
				{
					productId: "product-id",
					productName: "ABC",
					supplierId: "supplier-id",
					supplierName: "ABC",
					amount: 0,
				},
				{
					productId: "product-id",
					productName: "ABC",
					supplierId: "supplier-id",
					supplierName: "ABC",
					amount: 0,
				},
			],
		},
	- 401:
		```ts
		data: {
			message: "Please login first",
		},
		```
	- 500:
		```ts
		data: {
			message: "Internal server error",
		},
		```

### Export warehouse

[Back to top](#API-Documentation)

- URL: https://quan-ly-kho-api.vercel.app/api/warehouses/export
- Method: POST
- Header: Authorization: Bearer token-string
- Body:
	```json
	{
		"productId": "product-id",
		"supplierId": "supplier-id",
		"amount": 0
	}
	```
- Response:
	- 201:
		```ts
		data: {
			message: "Export warehouse successfully",
			exportInformation: {
				_id: "export-id",
				productId: "product-id",
				productName: "ABC",
				supplierId: "supplier-id",
				supplierName: "ABC",
				amount: 0,
			},
		},
		```
	- 400:
		```ts
		data: {
			message: "Amount is not enough",
		},
		```
	- 401:
		```ts
		data: {
			message: "Please login first",
		},
		```
	- 404:
		```ts
		data: {
			message: "Product not found",
		},
		```
		or
		```ts
		data: {
			message: "Supplier not found",
		},
		```
	- 500:
		```ts
		data: {
			message: "Internal server error",
		},
		```

### Get list of export warehouse

[Back to top](#API-Documentation)

- URL: https://quan-ly-kho-api.vercel.app/api/warehouses/export
- Method: GET
- Header: Authorization: Bearer token-string
- Parameter:
	- supplierId: string
		- Optional
		- Filter by supplier id
	- page: number
		- Optional
		- Page number
		- Use with type = all
	- limit: number
		- Optional
		- Limit number of products per page
		- Default: no limit
		- Use with type = all
	- type: string
		- Optional
		- Filter by type
		- Default: all
		- Allowed values:
			- all
			- last-month
			- last-week
- Response:
	- 200:
		```ts
		// If type = all
		data: {
			products: [
				{
					_id: "import-id",
					productId: "product-id",
					productName: "ABC",
					supplierId: "supplier-id",
					supplierName: "ABC",
					time: 1637744085913,
					amount: 0,
				},
				{
					_id: "import-id",
					productId: "product-id",
					productName: "ABC",
					supplierId: "supplier-id",
					supplierName: "ABC",
					time: 1637744085913,
					amount: 0,
				},
			],
			totalProduct: 2,
			totalPage: 1,
			page: 1,
		},
		```
		or
		```ts
		// If type = last-month || last-week
		data: {
			products: [
				{
					productId: "product-id",
					productName: "ABC",
					supplierId: "supplier-id",
					supplierName: "ABC",
					amount: 0,
				},
				{
					productId: "product-id",
					productName: "ABC",
					supplierId: "supplier-id",
					supplierName: "ABC",
					amount: 0,
				},
			],
		},
	- 401:
		```ts
		data: {
			message: "Please login first",
		},
		```
	- 500:
		```ts
		data: {
			message: "Internal server error",
		},
		```
