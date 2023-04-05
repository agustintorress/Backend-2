import { promises as fs } from "fs"

export default class ProductManager {
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

//const productos = new ProductManager();

// productos.addProduct("Manzana", "Una manzana verde deliciosa", 100, "imagen", "abc123", "5")
// productos.addProduct("Cafe", "Cafe Colombiano", 1000, "imagen2", "abc124", "10")
// productos.addProduct("Pera", "Una pera que no espera", 30, "imagen3", "abc125", "15")
// productos.addProduct("Uva", "Para hacer un rico vino", 10, "imagen4", "abc126", "20")
// productos.addProduct("Melon", "Melon Melon, Melon Melon", 300, "imagen5", "abc127", "25")
// productos.addProduct("Anana", "Anana o piña?", 100, "imagen6", "abc128", "35")
// productos.addProduct("Sandia", "Para el veranito que se nos fue", 400, "imagen7", "abc129", "45")
// productos.addProduct("Kiwi", "Nunca lo usas, no lo compres", 150, "imagen8", "abc130", "55")
// productos.addProduct("Limon", "Limoncito para el chinchu", 50, "imagen9", "abc131", "65")
// productos.addProduct("Te", "Un tecito bien rico", 300, "imagen10", "abc132", "100")

//productos.getProducts()

//productos.getProductsById(4)

//productos.deleteProductsById(2)

// productos.updateProducts({
//     title: 'Globos',
//     description: 'Globos de muchos colores',
//     price: 400,
//     image: 'imagen',
//     code: 'abc125',
//     stock: '15',
//     id: 3
// })