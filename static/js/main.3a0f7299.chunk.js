(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{147:function(e,n){},150:function(e,n,t){},154:function(e,n,t){},155:function(e,n,t){},157:function(e,n,t){},158:function(e,n,t){},159:function(e,n,t){},160:function(e,n,t){},161:function(e,n,t){},162:function(e,n,t){},164:function(e,n,t){},165:function(e,n,t){"use strict";t.r(n);var a=t(1),r=t.n(a),o=t(11),c=t.n(o),l=(t(101),t(102),t(24)),u=t(26),i=t(6),s=t(54),m=t.n(s),d=t(81),f=t(82),b=t.n(f),p=t(83),v="https://skribbl-remake.herokuapp.com/",g=768,h=t.n(p)()(v,{transports:["websocket"]});function E(e,n,t,a){e=e.toLowerCase(),h.emit("send_join_room",{gameCode:e,pid:n,playerName:t}),h.on("join_room_success",function(t){h.off("join_room_success"),y(e,n,a)}),h.on("join_room_error",function(e){h.off("join_room_error"),alert("join room error")})}function C(){return(C=Object(d.a)(m.a.mark(function e(){var n,t;return m.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(null==(n=localStorage.getItem("pid"))){e.next=3;break}return e.abrupt("return",Promise.resolve(n));case 3:return e.prev=3,e.next=6,b.a.post(v+"/api/player/new");case 6:return t=e.sent,console.log(t.data),n=t.data.pid,localStorage.setItem("pid",n),e.abrupt("return",n);case 13:return e.prev=13,e.t0=e.catch(3),alert("Failed to get pid"),console.log(e.t0.response),e.abrupt("return","");case 18:case"end":return e.stop()}},e,null,[[3,13]])}))).apply(this,arguments)}function y(e,n,t){h.on("join_room_announcement",function(a){h.off("join_room_announcement"),a.gameCode=e,a.pid=n,t.push("/room?gameCode=".concat(e),a)})}function O(){var e=Object(a.useState)({width:window.innerWidth,height:window.innerHeight}),n=Object(i.a)(e,2),t=n[0],r=n[1];return Object(a.useLayoutEffect)(function(){function e(){r({width:window.innerWidth,height:window.innerHeight})}return window.addEventListener("resize",e),function(){window.removeEventListener("resize",e)}},[]),t}t(150);function _(e){var n=e.children,t=e.className;return r.a.createElement("div",{className:"Panel ".concat(t)},n)}_.defaultProps={children:[],className:""};var w=_,j=t(205),N=t(195),k=Object(N.a)({textField:{margin:"7px","& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":{borderColor:"#f64f59"},"&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":{borderColor:"#c471ed"},"& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":{borderColor:"#12c2e9"},"& .MuiOutlinedInput-root":{color:"white"},"& label":{color:"white"},"& label.Mui-focused":{color:"white"}}});function P(e){var n=k(),t=e.label,a=e.variant,o=e.value,c=e.onChange,l=e.error,u=e.inputRef,i=e.onKeyDown,s=e.className;return r.a.createElement(j.a,{label:t,variant:a,value:o,onChange:c,error:l,inputRef:u,onKeyDown:i,className:"".concat(n.textField," ").concat(s)})}P.defaultProps={label:null,variant:"standard",value:null,onChange:null,error:null,inputRef:null,onKeyDown:null,className:""};var R=P,S=t(0),F=t(19);t(154);var x=function(){return r.a.createElement("div",{className:"Footer"},r.a.createElement("p",{className:"FooterText"},"Created by"," ",r.a.createElement("a",{className:"FooterLink",href:"https://huberthung.me",target:"_blank",rel:"noopener noreferrer"},"Hubert Hung")),r.a.createElement("a",{className:"FooterLink",href:"https://github.com/hubert322/pictionary",target:"_blank",rel:"noopener noreferrer"},r.a.createElement(S.b.Provider,{value:{size:"2.2rem"}},r.a.createElement(F.c,null))))};t(35),t(155);var M=function(){var e=Object(a.useState)(""),n=Object(i.a)(e,2),t=n[0],o=n[1],c=function(e,n){var t=Object(a.useState)(localStorage.getItem(e)||n),r=Object(i.a)(t,2),o=r[0],c=r[1];return Object(a.useEffect)(function(){localStorage.setItem(e,o)},[o]),[o,c]}("playerName",""),s=Object(i.a)(c,2),m=s[0],d=s[1],f=Object(a.useState)("Name"),b=Object(i.a)(f,2),p=b[0],v=b[1],g=Object(a.useState)(!1),O=Object(i.a)(g,2),_=O[0],j=O[1],N=Object(a.useState)("Game Code"),k=Object(i.a)(N,2),P=k[0],S=k[1],F=Object(a.useState)(!1),M=Object(i.a)(F,2),T=M[0],I=M[1],G=Object(a.useState)(null),B=Object(i.a)(G,2),L=B[0],W=B[1],D=Object(u.f)();return Object(a.useEffect)(function(){(function(){return C.apply(this,arguments)})().then(function(e){W(e)})},[]),r.a.createElement("div",{className:"Home"},r.a.createElement(l.b,{to:"/",className:"HomeTitle"},"Pictionary Live"),null!==L?r.a.createElement(w,{className:"HomeMainContainer"},r.a.createElement(R,{label:p,variant:"outlined",value:m,onChange:function(e){return d(e.target.value)},error:_}),r.a.createElement("div",{className:"HomeJoinGameContainer"},r.a.createElement(R,{label:P,variant:"outlined",className:"HomeJoinGameTextField",value:t,onChange:function(e){return o(e.target.value)},error:T}),r.a.createElement("button",{type:"button",className:"Button HomeJoinGameButton",onClick:function(){""===t||""===m?(""===t&&(I(!0),S("Game Code required")),""===m&&(j(!0),v("Name required"))):"string"!==typeof L?console.log("Waiting for promise to resolve..."):E(t,L,m,D)}},"Join Game")),r.a.createElement("button",{type:"button",className:"Button HomeNewGameButton",onClick:function(){""===m?(j(!0),v("Name required")):"string"!==typeof L?console.log("Waiting for promise to resolve..."):function(e,n,t){h.emit("send_new_room",{pid:e,playerName:n}),h.on("new_room_success",function(n){h.off("new_room_success"),y(n.gameCode,e,t)}),h.on("new_room_error",function(e){alert("new room error"),console.log(e),h.off("new_room_error")})}(L,m,D)}},"New Game")):r.a.createElement("p",null,"Loading..."),r.a.createElement(x,null))},T=t(203),I=t(202),G=t(200),B=t(44);t(157);var L=Object(N.a)({formControl:{margin:"0px 7px","& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":{borderColor:"#f64f59"},"&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":{borderColor:"#c471ed"},"& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":{borderColor:"#12c2e9"},"& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline":{borderColor:"rgba(255, 255, 255, 0.38)"},"& .Mui-disabled":{cursor:"not-allowed"},"& .MuiOutlinedInput-root":{color:"white"},"& .MuiOutlinedInput-root.Mui-disabled":{color:"rgba(255, 255, 255, 0.38)"},"& label":{color:"white"},"& label.Mui-focused":{color:"white"},"& label.Mui-disabled":{color:"rgba(255, 255, 255, 0.54)"},"& option":{color:"black"},"& .MuiSelect-icon":{fill:"white"},"& .MuiSelect-icon.Mui-disabled":{fill:"rgba(255, 255, 255, 0.26)"}}});var W=function(){var e=L(),n=Object(u.g)().state,t=n.gameCode,o=n.pid,c=Object(a.useState)(n.players),s=Object(i.a)(c,2),m=s[0],d=s[1],f=Object(a.useState)(n.ownerPid),b=Object(i.a)(f,2),p=b[0],v=b[1],E=Object(a.useState)(3),C=Object(i.a)(E,2),y=C[0],_=C[1],j=Object(a.useState)("60s"),N=Object(i.a)(j,2),k=N[0],P=N[1],R=O().width,x=Object(u.f)();return Object(a.useEffect)(function(){return h.on("join_room_announcement",function(e){d(e.players),v(p)}),function(){h.off("join_room_announcement")}},[]),Object(a.useEffect)(function(){return h.on("play_game_announcement",function(){x.push("/game?gameCode=".concat(t),{gameCode:t,pid:o,players:m,ownerPid:p,drawTime:parseInt(k.slice(0,-1))})}),function(){h.off("play_game_announcement")}},[t,o,m,x]),r.a.createElement("div",{className:"Room"},r.a.createElement(l.b,{to:"/",className:"RoomTitleLink"},"Pictionary Live"),r.a.createElement("h2",{className:"RoomGameCode"},"Game Code: ",t),r.a.createElement("div",{className:"RoomMainContainer"},r.a.createElement(w,{className:"RoomPlayersContainer"},r.a.createElement("h3",{className:"RoomContainerTitle"},"Players"),r.a.createElement("div",{className:"RoomPlayersList"},m.map(function(e){return r.a.createElement("div",{className:"RoomPlayer",key:e._id},r.a.createElement(S.b.Provider,{value:{size:R>=g?"3rem":"2rem"}},e._id===p?r.a.createElement(F.b,null):r.a.createElement(B.a,null)),r.a.createElement("span",{className:"RoomPlayerName"},e.playerName),r.a.createElement("span",{className:"RoomPlayerTag"},e._id===o?"You":" "))}))),r.a.createElement(w,{className:"RoomGameControlsContainer"},r.a.createElement("h3",{className:"RoomContainerTitle"},"Settings"),r.a.createElement(T.a,{variant:"outlined",className:e.formControl,disabled:o!==p},r.a.createElement(I.a,{htmlFor:"roundsSelector"},"Rounds"),r.a.createElement(G.a,{native:!0,label:"Rounds",value:y,onChange:function(e){return _(e.target.value)},inputProps:{id:"roundsSelector"}},r.a.createElement("option",null,"3"),r.a.createElement("option",null,"5"),r.a.createElement("option",null,"10"))),r.a.createElement(T.a,{variant:"outlined",className:e.formControl,disabled:o!==p},r.a.createElement(I.a,{htmlFor:"roundsSelector"},"Draw Time"),r.a.createElement(G.a,{native:!0,label:"Rounds",value:k,onChange:function(e){return P(e.target.value)},inputProps:{id:"drawTime"}},r.a.createElement("option",null,"30s"),r.a.createElement("option",null,"60s"),r.a.createElement("option",null,"90s"))),r.a.createElement("button",{type:"button",className:"Button RoomPlayButton",onClick:function(){m.length>1&&function(e,n,t){t=parseInt(t.slice(0,-1)),h.emit("send_play_game",{gameCode:e,rounds:n,drawTime:t})}(t,y,k)},disabled:o!==p||m.length<=1},"Play"))))};t(158);function D(e){var n=e.players,t=e.pid,a=e.ownerPid,o=e.artistPid,c=e.guessedCorrectPid,l=e.rankings,u=O().width;return r.a.createElement(w,{className:"PlayersList"},n.map(function(e,n){var i=e.playerName,s=e._id,m=e.score;return r.a.createElement("div",{className:"PlayersListPlayer",key:s,style:{backgroundColor:s===c?"rgb(35, 231, 17)":"transparent"}},r.a.createElement("div",{className:"PlayersListPlayerRankingIcon"},r.a.createElement("span",{className:"PlayersListRanking"},"#",l[n]),r.a.createElement(S.b.Provider,{value:{size:u>=g?"1.8rem":"1.5rem"}},s===a?r.a.createElement(F.b,null):r.a.createElement(B.a,null)),r.a.createElement(S.b.Provider,{value:{size:u>=g?"1.5rem":"1.2rem"}},s===o?r.a.createElement(F.d,null):null)),r.a.createElement("span",{className:"PlayersListPlayerName"},i,t===s?" (You)":null,": ",m||0))}))}D.defaultProps={artistPid:null,guessedCorrectPid:null};var H=D,Y=t(90),z=t(89);t(159);function X(e){var n=e.gameCode,t=e.pid,o=e.artist,c=e.selectedWord,l=e.currRound,u=e.timer,s=Object(a.useState)("#000000"),m=Object(i.a)(s,2),d=m[0],f=m[1],b=Object(a.useState)("brush"),p=Object(i.a)(b,2),v=p[0],g=p[1],E=Object(a.useRef)(null),C=Object(a.useRef)(!1),y=Object(a.useRef)(null),O=Object(a.useRef)(null),_=Object(a.useRef)([]);function j(e){var n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(null!==o&&t===o._id)if(C.current=!0,document.body.style.userSelect="none",window.getSelection().removeAllRanges(),n)for(var a=0;a<1;++a)P(e,!1,a);else P(e,!1,-1)}function N(e){var n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(null!==o&&t===o._id&&"bucket"!==v&&C.current)if(n)for(var a=0;a<1;++a)P(e,!0,a);else P(e,!0,-1)}function k(){null!==o&&t===o._id&&(document.body.style.userSelect="auto",C.current=!1)}function P(e,t,a){var r=function(e,n){var t,a,r=E.current.getBoundingClientRect();-1!==n?(t=e.touches[n].clientX,a=e.touches[n].clientY):(t=e.clientX,a=e.clientY);return{currX:(t-r.left)/(r.right-r.left)*E.current.width,currY:(a-r.top)/(r.bottom-r.top)*E.current.height}}(e,a),o=r.currX,c=r.currY;if("brush"===v){if(t&&null!==y.current&&null!==O.current){var l={prevX:y.current,prevY:O.current,currX:o,currY:c,newColor:d};R(l,!0),function(e,n){h.emit("send_draw_line",{gameCode:e,line:n})}(n,l)}else{var u={x:o,y:c,newColor:d};x(u,!0),function(e,n){h.emit("send_draw_dot",{gameCode:e,dot:n})}(n,u)}y.current=o,O.current=c}else{var i={x:o,y:c,newColor:d};M(i,!0),function(e,n){h.emit("send_draw_fill",{gameCode:e,fill:n})}(n,i)}}function R(e,n){var t=e.prevX,a=e.prevY,r=e.currX,o=e.currY,c=e.newColor,l=E.current.getContext("2d");l.beginPath(),l.strokeStyle=c,l.lineWidth=2,l.moveTo(t,a),l.lineTo(r,o),l.stroke(),l.closePath(),n&&_.current[_.current.length-1].points.push({x:r,y:o})}function x(e,n){var t=e.x,a=e.y,r=e.newColor,o=E.current.getContext("2d");o.beginPath(),o.fillStyle=r,o.fillRect(t,a,2,2),o.closePath(),n&&(_.current.push({points:[],newColor:r,brushStyle:"brush"}),_.current[_.current.length-1].points.push({x:t,y:a}))}function M(e,n){function t(e,n,t,a){return 0<=e&&e<t&&0<=n&&n<a}function a(e,n,t,a,r,o,c,l){var u=4*(n*t+e);return a.data[u+0]===r&&a.data[u+1]===o&&a.data[u+2]===c&&a.data[u+3]===l}var r=e.x,o=e.y,c=e.newColor;r=Math.floor(r),o=Math.floor(o);var l=E.current.getContext("2d"),u=E.current.getBoundingClientRect(),s=u.width,m=u.height;if(s=Math.floor(s),m=Math.floor(m),t(r,o,s,m)){var d=l.getImageData(0,0,s,m),f=function(e,n,t){var a=4*(n*s+e);return[t.data[a+0],t.data[a+1],t.data[a+2],t.data[a+3]]}(r,o,d),b=Object(i.a)(f,4),p=b[0],v=b[1],g=b[2],h=b[3],C=[[0,-1],[1,-1],[1,0],[1,1],[0,1],[-1,1],[-1,0],[-1,-1]],y={};y["".concat(r,"+").concat(o)]=1;var O=[[r,o]];for(l.beginPath(),l.fillStyle=c,l.fillRect(r,o,1,1);O.length;)for(var w=O.pop(),j=Object(i.a)(w,2),N=j[0],k=j[1],P=0,R=C;P<R.length;P++){var S=R[P],F=Object(i.a)(S,2),x=N+F[0],M=k+F[1];t(x,M,s,m)&&a(x,M,s,d,p,v,g,h)&&!y.hasOwnProperty("".concat(x,"+").concat(M))&&(l.fillRect(x,M,1,1),O.push([x,M]),y["".concat(x,"+").concat(M)]=1)}l.closePath(),n&&(_.current.push({points:[],newColor:c,brushStyle:"bucket"}),_.current[_.current.length-1].points.push({x:r,y:o}))}}function T(e){_.current.length&&(E.current.getContext("2d").clearRect(0,0,E.current.width,E.current.height),e&&(_.current=[]))}return Object(a.useEffect)(function(){return h.on("draw_line_announcement",function(e){null!==E.current&&R(e.line,!0)}),function(){h.off("draw_line_announcement")}},[]),Object(a.useEffect)(function(){return h.on("draw_dot_announcement",function(e){null!==E.current&&x(e.dot,!0)}),function(){h.off("draw_dot_announcement")}},[]),Object(a.useEffect)(function(){return h.on("draw_fill_announcement",function(e){null!==E.current&&M(e.fill,!0)}),function(){h.off("draw_fill_announcement")}},[]),Object(a.useEffect)(function(){return h.on("undo_canvas_announcement",function(){null!==E.current&&function(){if(_.current.length){T(!1),_.current.pop();for(var e=0;e<_.current.length;++e){var n=_.current[e],t=n.points,a=n.newColor;if("brush"===n.brushStyle){x({x:t[0].x,y:t[0].y,newColor:a},!1);for(var r=1;r<t.length;++r)R({prevX:t[r-1].x,prevY:t[r-1].y,currX:t[r].x,currY:t[r].y},!1)}else M({x:t[0].x,y:t[0].y,newColor:a},!1)}}}()}),function(){h.off("undo_canvas_announcement")}},[]),Object(a.useEffect)(function(){return h.on("clear_canvas_announcement",function(){null!==E.current&&T(!0)}),function(){h.off("clear_canvas_announcement")}},[]),Object(a.useEffect)(function(){null===c&&T(!0)},[o]),r.a.createElement(w,{className:"CanvasContainer"},r.a.createElement("div",{className:"CanvasHeader"},r.a.createElement("span",{className:"CanvasCurrRound"},"Round: ",l),r.a.createElement("span",{className:"CanvasUnderlinedWord"},"Word:"," ",null!==o&&t!==o._id&&null!==c?function(e){for(var n="",t=0;t<e.length;++t)" "===e[t]?n+="  ":n+="__",t+1!==e.length&&(n+="  ");return n}(c):c),r.a.createElement("span",{className:"CanvasTimer"},"Timer: ",u,"s")),r.a.createElement("canvas",{className:"Canvas",ref:E,onTouchStart:function(e){e.preventDefault(),j(e,!0)},onMouseDown:j,onTouchMove:function(e){e.preventDefault(),N(e,!0)},onMouseMove:N,onTouchEnd:function(e){e.preventDefault(),k()},onMouseUp:k,onMouseLeave:function(){y.current=null,O.current=null}}),r.a.createElement("div",{className:"CanvasDummy"}),r.a.createElement("div",{className:"CanvasControlsContainer"},r.a.createElement("div",{className:"CanvasColorsContainer"},["#000000","#FFFFFF","#808080","#C0C0C0","#FF0000","#FF7F00","#FFFF00","#00FF00","#00FFFF","#0000FF","#7F00FF","#FF00FF"].map(function(e){return r.a.createElement("button",{key:e,type:"button",style:{backgroundColor:e,color:null!==o&&t===o._id&&d===e?"#FFFFFF"!==e?"white":"black":e},className:"Button CanvasControl CanvasColorControl",disabled:null!==o&&t!==o._id,onClick:function(){f(e)}},r.a.createElement(S.b.Provider,{value:{size:"2.5vmin"}},r.a.createElement(F.a,null)))})),r.a.createElement("button",{type:"button",className:"Button CanvasControl",style:{backgroundColor:null!==o&&t===o._id&&"brush"===v?"#f64f59":"#ffffff"},onClick:function(){return g("brush")}},r.a.createElement(S.b.Provider,{value:{size:"5vmin"}},r.a.createElement(F.d,null))),r.a.createElement("button",{type:"button",className:"Button CanvasControl",style:{backgroundColor:null!==o&&t===o._id&&"bucket"===v?"#f64f59":"#ffffff"},onClick:function(){return g("bucket")}},r.a.createElement(S.b.Provider,{value:{size:"5vmin"}},r.a.createElement(z.a,null))),r.a.createElement("button",{type:"button",className:"Button CanvasControl",onClick:function(){_.current.length&&null!==o&&t===o._id&&function(e){h.emit("send_undo_canvas",{gameCode:e})}(n)}},r.a.createElement(S.b.Provider,{value:{size:"5vmin"}},r.a.createElement(Y.a,null))),r.a.createElement("button",{type:"button",className:"Button CanvasControl",onClick:function(){_.current.length&&null!==o&&t===o._id&&function(e){h.emit("send_clear_canvas",{gameCode:e})}(n)}},r.a.createElement(S.b.Provider,{value:{size:"5vmin"}},r.a.createElement(F.e,null))),null===o||t!==o._id?r.a.createElement("div",{className:"CanvasControlsOverlay"}):null))}X.defaultProps={artist:null,selectedWord:""};var A=X,J=t(91);t(160);var U=Object(N.a)({textField:{margin:"5px 0px","& .MuiOutlinedInput-root":{color:"black"},"& input":{padding:"7px"},"& label":{color:"black",transform:"translate(14px, 7px) scale(1)"},"& label.Mui-focused":{color:"black"}}});var K=function(e){var n=U(),t=e.gameCode,o=e.pid,c=e.setGuessedCorrectPid,l=Object(a.useState)(""),u=Object(i.a)(l,2),s=u[0],m=u[1],d=Object(a.useState)([]),f=Object(i.a)(d,2),b=f[0],p=f[1],v=Object(a.useRef)(null),g=Object(a.useRef)(null);function E(e,n){var t={message:e,isCorrect:n};p(function(e){return[].concat(Object(J.a)(e),[t])}),v.current.scrollTop=v.current.scrollHeight}function C(){!function(e,n,t){h.emit("send_message",{gameCode:e,pid:n,message:t})}(t,o,s),m(""),g.current.focus()}return Object(a.useEffect)(function(){return h.on("send_message_announcement",function(e){E("".concat(e.player.playerName,": ").concat(e.message),!1)}),function(){h.off("send_message_announcement")}},[]),Object(a.useEffect)(function(){return h.on("correct_word_announcement",function(e){E("".concat(e.player.playerName," has guessed the word!"),!0),c(e.player._id)}),function(){h.off("correct_word_announcement")}},[c]),r.a.createElement(w,{className:"ChatRoom"},r.a.createElement("div",{className:"ChatRoomMessageArea",ref:v},b.map(function(e,n){return r.a.createElement("p",{key:"msg".concat(n),className:"ChatRoomMessage ".concat(e.isCorrect?"ChatRoomCorrectMessage":"")},e.message)})),r.a.createElement(R,{className:"".concat(n.textField," ChatRoomTextField"),label:"message",variant:"outlined",value:s,onChange:function(e){return m(e.target.value)},inputRef:g,onKeyDown:function(e){return function(e){13===e.keyCode&&""!==s&&C()}(e)}}))};t(161);function q(e){var n=e.gameCode,t=e.pid,a=e.artist,o=e.words,c=e.endTurnData,l=e.endGameData,u=e.onBackRoom;function i(){return r.a.createElement(r.a.Fragment,null,o.map(function(e){return r.a.createElement("button",{type:"button",key:e,className:"Button OverlayWordButton",onClick:function(){return function(e,n){h.emit("send_selected_word",{gameCode:e,word:n})}(n,e)}},e)}))}return r.a.createElement(w,{className:"Overlay"},null!==l?r.a.createElement("div",{className:"OverlayEndTurnResultsContainer"},l.players.map(function(e,n){return r.a.createElement("p",{key:e._id,className:"OverlayEndTurnResultsText"},"#",l.rankings[n]," ",e.playerName,": ",e.score)}),r.a.createElement("button",{type:"button",className:"Button OverlayEndTurnResultsButton",onClick:u},"Back to Room")):null!==c?r.a.createElement("div",{className:"OverlayEndTurnResultsContainer"},r.a.createElement("p",{className:"OverlayEndTurnResultsText"},"Selected Word: ",c.selectedWord),c.players.map(function(e){return r.a.createElement("p",{key:e._id,className:"OverlayEndTurnResultsText"},e.playerName,": ",e.score," + ",e.earnedScore)})):null===a?r.a.createElement("p",null,"Loading..."):t!==a._id?r.a.createElement("p",null,a.playerName," is choosing their word..."):i())}q.defaultProps={artist:null,endTurnData:null,endGameData:null};var $=q;t(162);var Q=function(){var e=Object(u.g)().state,n=e.gameCode,t=e.pid,o=e.ownerPid,c=e.drawTime,s=Object(a.useState)(e.players),m=Object(i.a)(s,2),d=m[0],f=m[1],b=Object(a.useState)(null),p=Object(i.a)(b,2),v=p[0],g=p[1],C=Object(a.useState)(!1),y=Object(i.a)(C,2),O=y[0],_=y[1],w=Object(a.useState)([]),j=Object(i.a)(w,2),N=j[0],k=j[1],P=Object(a.useState)(c),R=Object(i.a)(P,2),S=R[0],F=R[1],x=Object(a.useState)(new Array(d.length).fill(1)),M=Object(i.a)(x,2),T=M[0],I=M[1],G=Object(a.useState)(null),B=Object(i.a)(G,2),L=B[0],W=B[1],D=Object(a.useState)(null),Y=Object(i.a)(D,2),z=Y[0],X=Y[1],J=Object(a.useState)(null),U=Object(i.a)(J,2),q=U[0],Q=U[1],V=Object(a.useState)(null),Z=Object(i.a)(V,2),ee=Z[0],ne=Z[1],te=Object(a.useState)(1),ae=Object(i.a)(te,2),re=ae[0],oe=ae[1],ce=Object(u.f)();return Object(a.useEffect)(function(){!function(e){h.emit("send_enter_game",{gameCode:e})}(n)},[]),Object(a.useEffect)(function(){return h.on("player_disconnect",function(e){f(d.filter(function(n){return n._id!==e.player._id}))}),function(){h.off("player_disconnect")}},[d]),Object(a.useEffect)(function(){return h.on("next_artist_announcement",function(e){console.log("got next artist"),function(){if(null!==L){f(d.map(function(e,n){var t=L.players[n];return e.score=t.score+t.earnedScore,e}));var e=d.map(function(e){return n(e.score)}).sort().reverse();I(d.map(function(t){return e.indexOf(n(t.score))+1}))}function n(e){return e||0}}(),W(null),ne(null),g(e.artist),k(e.words),X(null),oe(e.currRound)}),function(){h.off("next_artist_announcement")}},[]),Object(a.useEffect)(function(){return h.on("selected_word_announcement",function(e){_(!0),ne(e.selectedWord)}),function(){h.off("selected_word_announcement")}},[]),Object(a.useEffect)(function(){return h.on("timer_announcement",function(e){F(e.time)}),function(){h.off("timer_announcement")}},[]),Object(a.useEffect)(function(){return h.on("end_turn_announcement",function(e){W(e),_(!1)}),function(){h.off("end_turn_announcement")}},[]),Object(a.useEffect)(function(){return h.on("end_game_announcement",function(e){Q(e)}),function(){h.off("end_game_announcement")}},[]),r.a.createElement("div",{className:"Game"},r.a.createElement(l.b,{to:"/",className:"GameTitleLink"},"Pictionary Live"),r.a.createElement("h2",{className:"GameGameCode"},"Game Code: ",n),r.a.createElement("div",{className:"GamePlayContainer"},r.a.createElement("div",{className:"GameDummyPlayer"}),r.a.createElement("div",{className:"GameCanvasOverlayContainer"},r.a.createElement(A,{gameCode:n,pid:t,artist:v,selectedWord:ee,currRound:re,timer:S}),O?null:r.a.createElement($,{gameCode:n,pid:t,artist:v,words:N,endTurnData:L,endGameData:q,onBackRoom:function(){E(n,t,function(){var e=!0,n=!1,a=void 0;try{for(var r,o=d[Symbol.iterator]();!(e=(r=o.next()).done);e=!0){var c=r.value;if(c._id===t)return c.playerName}}catch(l){n=!0,a=l}finally{try{e||null==o.return||o.return()}finally{if(n)throw a}}return null}(),ce)}})),r.a.createElement("div",{className:"GameDummyChat"}),r.a.createElement("div",{className:"GamePlayersChatContainer"},r.a.createElement(H,{players:d,pid:t,ownerPid:o,artistPid:null!==v?v._id:null,guessedCorrectPid:z,rankings:T}),r.a.createElement(K,{gameCode:n,pid:t,setGuessedCorrectPid:X}))))};t(163);var V=function(){var e=O().height;return r.a.createElement(l.a,null,r.a.createElement("div",{className:"App",style:{height:e}},r.a.createElement(u.c,null,r.a.createElement(u.a,{exact:!0,path:"/"},r.a.createElement(M,null)),r.a.createElement(u.a,{path:"/room"},r.a.createElement(W,null)),r.a.createElement(u.a,{path:"/game"},r.a.createElement(Q,null)))))},Z=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function ee(e,n){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var t=e.installing;null!=t&&(t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),n&&n.onUpdate&&n.onUpdate(e)):(console.log("Content is cached for offline use."),n&&n.onSuccess&&n.onSuccess(e)))})}}).catch(function(e){console.error("Error during service worker registration:",e)})}t(164);var ne=document.getElementById("root");c.a.render(r.a.createElement(V,null),ne),function(e){if("serviceWorker"in navigator){if(new URL("",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",function(){var n="".concat("","/service-worker.js");Z?(function(e,n){fetch(e).then(function(t){var a=t.headers.get("content-type");404===t.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):ee(e,n)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(n,e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")})):ee(n,e)})}}()},35:function(e,n,t){},96:function(e,n,t){e.exports=t(165)}},[[96,1,2]]]);
//# sourceMappingURL=main.3a0f7299.chunk.js.map