<template>
  <div class="container">
    <ProductForm :productToEdit="productToEdit" @save="saveProduct" />
    <ProductList
      :products="filteredProducts"
      @delete="deleteProduct"
      @edit="setProductToEdit"
    />
    <div class="controls">
      <select v-model="filterMethod" class="filter-select">
        <option value="">All</option>
        <option value="reels">Reels</option>
        <option value="stories">Stories</option>
      </select>
      <button @click="sortProducts('asc')" class="sort-btn">
        Sort Ascending
      </button>
      <button @click="sortProducts('desc')" class="sort-btn">
        Sort Descending
      </button>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import ProductForm from "../components/ProductForm.vue";
import ProductList from "../components/ProductList.vue";

export default {
  components: { ProductForm, ProductList },
  setup() {
    const products = ref([]);
    const productToEdit = ref(null);
    const filterMethod = ref("");
    const sortDirection = ref("");

    const filteredProducts = computed(() => {
      let result = [...products.value];
      if (filterMethod.value) {
        result = result.filter(
          (product) => product.integrationMethod === filterMethod.value
        );
      }
      if (sortDirection.value === "asc") {
        result.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sortDirection.value === "desc") {
        result.sort((a, b) => b.name.localeCompare(a.name));
      }
      return result;
    });

    const saveProduct = (product) => {
      if (productToEdit.value) {
        const index = products.value.findIndex((p) => p.id === product.id);
        products.value.splice(index, 1, product);
      } else {
        product.id = Date.now();
        products.value.push(product);
      }
      productToEdit.value = null;
      saveToLocalStorage();
    };

    const deleteProduct = (id) => {
      products.value = products.value.filter((p) => p.id !== id);
      saveToLocalStorage();
    };

    const setProductToEdit = (product) => {
      productToEdit.value = { ...product };
    };

    const sortProducts = (direction) => {
      sortDirection.value = direction;
    };

    const saveToLocalStorage = () => {
      localStorage.setItem("products", JSON.stringify(products.value));
    };

    const loadFromLocalStorage = () => {
      const storedProducts = JSON.parse(localStorage.getItem("products"));
      if (storedProducts) {
        products.value = storedProducts;
      }
    };

    loadFromLocalStorage();

    return {
      filteredProducts,
      productToEdit,
      filterMethod,
      saveProduct,
      deleteProduct,
      setProductToEdit,
      sortProducts,
    };
  },
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;

  .controls {
    display: flex;
    margin-top: 20px;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    gap: 20px;
    justify-content: center;
    flex-wrap: wrap;

    .filter-select {
      padding: 10px;
      border-radius: 4px;
      border: 1px solid #ddd;
      font-size: 16px;
      margin-right: 10px;
    }

    .sort-btn {
      border: none;
      padding: 10px 20px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
      color: #fff;
      background-color: #42b983;
      margin-left: 10px;
      transition: background-color 0.3s;

      &:hover {
        background-color: #339a77;
      }

      &:focus {
        outline: none;
      }
    }
  }
}
</style>
