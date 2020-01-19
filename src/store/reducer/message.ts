 
 let messageNum = 1;
 
 export default function message (state = messageNum, {type, playload}) {
   switch (type) {
      case "message/SET_MESSAGE":
         messageNum = playload;
         return messageNum;
      break;
      default: return 1;
    }
}