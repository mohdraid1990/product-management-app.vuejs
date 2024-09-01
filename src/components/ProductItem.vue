<template>
  <div class="product-item">
    <h3>{{ product.name }}</h3>
    <p>Seller: {{ product.seller }}</p>
    <p>Integration Method: {{ product.integrationMethod }}</p>
    <button @click="$emit('edit', product)" class="edit-btn">Edit</button>
    <button @click="$emit('delete', product.id)" class="delete-btn">
      Delete
    </button>
  </div>
</template>

<script>
export default {
  props: {
    product: Object,
  },
};
</script>

<style lang="scss" scoped>
.product-item {
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 16px;
  margin: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;

  h3 {
    margin-top: 0;
  }

  .edit-btn,
  .delete-btn {
    border: none;
    padding: 8px 12px;
    margin: 5px;
    border-radius: 4px;
    cursor: pointer;
    color: #fff;

    &.edit-btn {
      background-color: #42b983;
    }

    &.delete-btn {
      background-color: #e57373;
    }
  }
}
</style>
