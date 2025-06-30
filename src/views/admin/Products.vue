<script setup>

</script>

<template>
  <div class="btn-dark float-right mb-5">新增商品</div>
  <table class="w-full table-auto text-left border-collapse">
    <thead class="border-b">
      <tr>
        <th class="p-4 w-28">商品</th>
        <th class="p-4"></th>
        <th class="p-4">售價</th>
        <th class="p-4">狀態</th>
        <th class="p-4"></th>
      </tr>
    </thead>
    <tbody>
      <tr class="border-b border-gray-300">
        <td class="p-4">
          <img src="/images/a.jpg" alt="" class="w-20 h-20 object-cover" />
        </td>
        <td class="p-4">
          <div class="font-semibold">name</div>
          <div class="text-sm text-gray-400">ID:123123</div>
        </td>
        <td class="p-4 text-[#3F88B4] font-semibold">$50</td>
        <td class="p-4 text-lime-600 font-semibold">上架中</td>
        <td class="p-4 w-70">
          <div class="flex justify-end space-x-5">
            <button class="font-semibold btn-white">編輯</button>
            <button class="font-semibold btn-white">刪除</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped></style>