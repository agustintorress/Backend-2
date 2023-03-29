import { promises as fs } from "fs"

class ProductManager {
    constructor() {
        this.patch = "./productos.txt";
        this.products = [];
    }

    static id = 0

    addProduct = async (title, description, price, image, code, stock) => {

        ProductManager.id++

        let newProduct = {
            title,
            description,
            price,
            image,
            code,
            stock,
            id: ProductManager.id
        };

        this.products.push(newProduct)

        await fs.writeFile(this.patch, JSON.stringify(this.products))
    };

    readProducts = async () => {
        let respuesta = await fs.readFile(this.patch, "utf-8")
        return JSON.parse(respuesta)
    }

    getProducts = async () => {
        let response = await this.readProducts()
        return console.log(response)
    }

    getProductsById = async (id) => {
        let response2 = await this.readProducts()
        if (!response2.find(product => product.id === id)) {
            console.log("Producto no encontrado")
        } else {
            console.log(response2.find(product => product.id === id))
        }
    };

    deleteProductsById = async (id) => {
        let borrar = await this.readProducts();
        let productFilter = borrar.filter(products => products.id != id)
        await fs.writeFile(this.patch, JSON.stringify(productFilter));
        console.log("Producto Eliminado")
    };

    updateProducts = async ({ id, ...producto }) => {
        await this.deleteProductsById(id);
        let productHold = await this.readProducts()
        let modifyProducts = [{ ...producto, id }, ...productHold]
        await fs.writeFile(this.patch, JSON.stringify(modifyProducts));
    };
}

const productos = new ProductManager();

// productos.addProduct("Manzana", "Una manzana verde deliciosa", 100, "imagen", "abc123", "5")
// productos.addProduct("Cafe", "Cafe Colombiano", 1000, "imagen", "abc124", "10")
// productos.addProduct("Globos", "Globos de muchos colores", 200, "imagen", "abc125", "15")

//productos.getProducts()

//productos.getProductsById(4)

//productos.deleteProductsById(2)

productos.updateProducts({
    title: 'Globos',
    description: 'Globos de muchos colores',
    price: 400,
    image: 'imagen',
    code: 'abc125',
    stock: '15',
    id: 3
})