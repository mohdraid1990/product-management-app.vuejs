<template>
  <div>
    <ProductItem
      v-for="product in paginatedProducts"
      :key="product.id"
      :product="product"
      @delete="deleteProduct"
      @edit="editProduct"
    />
    <div class="pagination-controls">
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <button @click="nextPage" :disabled="currentPage === totalPages">
        Next
      </button>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import ProductItem from "./ProductItem.vue";

export default {
  components: { ProductItem },
  props: {
    products: Array,
  },
  setup(props, { emit }) {
    const currentPage = ref(1);
    const productsPerPage = 20;

    const paginatedProducts = computed(() => {
      const start = (currentPage.value - 1) * productsPerPage;
      return props.products.slice(start, start + productsPerPage);
    });

    const totalPages = computed(() =>
      Math.ceil(props.products.length / productsPerPage)
    );

    const prevPage = () => {
      if (currentPage.value > 1) currentPage.value--;
    };

    const nextPage = () => {
      if (currentPage.value < totalPages.value) currentPage.value++;
    };

    const deleteProduct = (id) => {
      emit("delete", id);
    };

    const editProduct = (product) => {
      emit("edit", product);
    };

    return {
      paginatedProducts,
      prevPage,
      nextPage,
      currentPage,
      totalPages,
      deleteProduct,
      editProduct,
    };
  },
};
</script>

<style lang="scss" scoped>
.pagination-controls {
  margin-top: 20px;

  button {
    border: none;
    padding: 10px 20px;
    margin: 5px;
    border-radius: 4px;
    cursor: pointer;

    &:disabled {
      background-color: #ddd;
      cursor: not-allowed;
    }

    &:not(:disabled) {
      background-color: #42b983;
      color: #fff;

      &:hover {
        background-color: #339a77;
      }
    }
  }
}
</style>
