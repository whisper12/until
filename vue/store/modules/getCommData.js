import { categoryList, promotionCategoryList } from "@/api/commApi";

export default {
  state:{
    brandIdOptions: [{ value: "", label: "全部" }] //政策类型（品牌读取）
  },
  mutations:{
    getBrandIdOptions(state, payload) {
      payload.forEach(item => {
        state.brandIdOptions.push({
          value: item.id, label: item.brandName
        })
      })
    }
  },
  actions:{
    // 获取品牌列表
    getBrandList(context){
      categoryList({status:1}).then(res=>{
        console.log(19, res)
        if(res.code === 200){
          let arr = res.data.list;
          context.commit("getBrandIdOptions", arr)
        }
      })
    }
  }
}
