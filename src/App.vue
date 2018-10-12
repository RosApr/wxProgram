<script>
  import { getUserLoginInfo } from "@/utils/api"
  import { 
    OPEN_ID,
    TOKEN,
    USER_PROFILE,
    setDataToStorageIfIsAvailable
  } from "@/utils/common"
  import WXP from 'minapp-api-promise'
export default {
  async created () {
    let wxLoginRes = await WXP.login()
      if(wxLoginRes.errMsg == "login:ok") {
        const userProfileRes = await getUserLoginInfo({code: wxLoginRes.code})
        const { openid, token, data: userProfile } = userProfileRes.data
        setDataToStorageIfIsAvailable(TOKEN, token)
        setDataToStorageIfIsAvailable(OPEN_ID, openid)
        setDataToStorageIfIsAvailable(USER_PROFILE, userProfile)
      }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
