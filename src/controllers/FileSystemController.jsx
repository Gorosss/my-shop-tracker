import FileSystemModel from "../models/FileSystemModel";


export class FileSystemController {

  static async savePurchasedList(purchasedList) {
    console.log("c",purchasedList)
    await FileSystemModel.savePurchasedList(purchasedList);
  }

  static async loadPurchasedList() {
    console.log("a")
    return await FileSystemModel.loadPurchasedList();
  }

  static async deletePurchase(id) {
    console.log("delete purchase")
    return await FileSystemModel.deletePurchase(id);
  }

  static async saveShoppingList(shoppingList) {
    await FileSystemModel.saveShoppingList(shoppingList);
  }

  static async loadShoppingList() {
    return await FileSystemModel.loadShoppingList();
  }

  static async deleteFromShoppingList(id) {
    await FileSystemModel.deleteShoppingList(id);
  }
}

export default FileSystemController;
