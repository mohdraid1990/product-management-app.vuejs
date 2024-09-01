<template>
  <form @submit.prevent="handleSubmit" class="product-form">
    <input v-model="product.name" placeholder="Product Name" required />
    <input v-model="product.seller" placeholder="Seller" required />
    <select v-model="product.integrationMethod">
      <option value="reels">Reels</option>
      <option value="stories">Stories</option>
    </select>
    <button type="submit">Save</button>
  </form>
</template>

<script>
import { ref, watchEffect } from "vue";

export default {
  props: {
    productToEdit: Object,
  },
  setup(props, { emit }) {
    const product = ref({ name: "", seller: "", integrationMethod: "reels" });

    watchEffect(() => {
      if (props.productToEdit) {
        product.value = { ...props.productToEdit };
      }
    });

    const handleSubmit = () => {
      emit("save", product.value);
      product.value = { name: "", seller: "", integrationMethod: "reels" };
    };

    return { product, handleSubmit };
  },
};
</script>

<style lang="scss" scoped>
.product-form {
  display: flex;
  flex-direction: column;
  gap: 10px;

  input,
  select,
  button {
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #ddd;
  }

  button {
    background-color: #42b983;
    color: #fff;
    border: none;
    cursor: pointer;

    &:hover {
      background-color: #339a77;
    }
  }
}
</style>
