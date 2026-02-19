import{r as a,j as e}from"./vendor-react-D380Hx73.js";import{c as A,i as C}from"./index-Beyst0Xe.js";function R({isOpen:u,onClose:o,defaultTab:d="signin"}){const[n,i]=a.useState(d),[p,x]=a.useState(""),[h,b]=a.useState(""),[g,c]=a.useState(null),{signIn:N,signUp:E,loading:m,error:f,clearError:s}=A(),v=a.useRef(null),S=C();if(a.useEffect(()=>{u&&(s(),c(null),x(""),b(""),i(d),setTimeout(()=>{var t;return(t=v.current)==null?void 0:t.focus()},100))},[u,d,s]),a.useEffect(()=>{s(),c(null)},[n,s]),!u)return null;const z=async t=>{t.preventDefault(),s(),c(null),n==="signup"?(await E(p,h)).error||(c("Account created! Check your email to verify, then sign in."),setTimeout(o,2500)):(await N(p,h)).error||o()};a.useEffect(()=>{const t=r=>{r.key==="Escape"&&o()};return document.addEventListener("keydown",t),()=>document.removeEventListener("keydown",t)},[o]);const y=a.useRef(null);return a.useEffect(()=>{const t=y.current;if(!t)return;const r=t.querySelectorAll('button, input, [tabindex]:not([tabindex="-1"])');r.length&&r[0].focus();const k=l=>{if(l.key!=="Tab"||!r.length)return;const j=r[0],w=r[r.length-1];l.shiftKey&&document.activeElement===j?(l.preventDefault(),w.focus()):!l.shiftKey&&document.activeElement===w&&(l.preventDefault(),j.focus())};return t.addEventListener("keydown",k),()=>t.removeEventListener("keydown",k)},[n]),e.jsx("div",{className:"auth-overlay",onClick:o,children:e.jsxs("div",{ref:y,className:"auth-modal",role:"dialog","aria-modal":"true","aria-labelledby":"auth-title",onClick:t=>t.stopPropagation(),children:[e.jsx("button",{className:"auth-close",onClick:o,"aria-label":"Close",children:"×"}),e.jsx("h2",{id:"auth-title",className:"auth-title",children:"Stull Atlas Studio"}),e.jsxs("div",{className:"auth-tabs",children:[e.jsx("button",{className:`auth-tab ${n==="signin"?"active":""}`,onClick:()=>i("signin"),children:"Sign In"}),e.jsx("button",{className:`auth-tab ${n==="signup"?"active":""}`,onClick:()=>i("signup"),children:"Sign Up"})]}),e.jsxs("form",{onSubmit:z,className:"auth-form",children:[e.jsxs("label",{className:"auth-label",children:["Email",e.jsx("input",{ref:v,type:"email",value:p,onChange:t=>x(t.target.value),required:!0,className:"auth-input",placeholder:"potter@studio.com",autoComplete:"email"})]}),e.jsxs("label",{className:"auth-label",children:["Password",e.jsx("input",{type:"password",value:h,onChange:t=>b(t.target.value),required:!0,minLength:6,className:"auth-input",placeholder:"At least 6 characters",autoComplete:n==="signup"?"new-password":"current-password"})]}),n==="signup"&&S&&e.jsx("p",{className:"auth-free-banner",children:"All features free through April — no credit card needed."}),f&&e.jsx("p",{className:"auth-error",children:f}),g&&e.jsx("p",{className:"auth-success",children:g}),e.jsx("button",{type:"submit",className:"auth-submit",disabled:m,children:m?"Working...":n==="signup"?"Create Account":"Sign In"})]}),e.jsx("p",{className:"auth-footer",children:n==="signin"?e.jsxs(e.Fragment,{children:["Don't have an account? ",e.jsx("button",{className:"auth-link",onClick:()=>i("signup"),children:"Sign up free"})]}):e.jsxs(e.Fragment,{children:["Already have an account? ",e.jsx("button",{className:"auth-link",onClick:()=>i("signin"),children:"Sign in"})]})}),e.jsx("style",{children:`
          .auth-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.6);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            backdrop-filter: blur(4px);
          }

          .auth-modal {
            background: var(--bg-secondary);
            border: 1px solid var(--border-primary);
            border-radius: 12px;
            padding: 32px;
            width: 380px;
            max-width: 90vw;
            position: relative;
          }

          .auth-close {
            position: absolute;
            top: 12px;
            right: 16px;
            background: none;
            border: none;
            color: var(--text-secondary);
            font-size: 24px;
            cursor: pointer;
            padding: 0;
            line-height: 1;
          }

          .auth-close:hover {
            color: var(--text-primary);
          }

          .auth-title {
            margin: 0 0 20px;
            font-size: 22px;
            font-weight: 600;
            text-align: center;
            color: var(--text-bright);
          }

          .auth-tabs {
            display: flex;
            gap: 0;
            margin-bottom: 20px;
            border-bottom: 1px solid var(--border-primary);
          }

          .auth-tab {
            flex: 1;
            padding: 10px;
            background: none;
            border: none;
            border-bottom: 2px solid transparent;
            color: var(--text-secondary);
            font-size: 14px;
            cursor: pointer;
            transition: all 0.15s;
          }

          .auth-tab:hover {
            color: var(--text-label);
          }

          .auth-tab.active {
            color: var(--accent);
            border-bottom-color: var(--accent);
          }

          .auth-form {
            display: flex;
            flex-direction: column;
            gap: 14px;
          }

          .auth-label {
            display: flex;
            flex-direction: column;
            gap: 4px;
            font-size: 13px;
            color: var(--text-label);
          }

          .auth-input {
            padding: 10px 12px;
            border: 1px solid var(--border-input);
            border-radius: 6px;
            background: var(--bg-input);
            color: var(--text-primary);
            font-size: 14px;
            outline: none;
            transition: border-color 0.15s;
          }

          .auth-input:focus {
            border-color: var(--accent);
          }

          .auth-input::placeholder {
            color: var(--text-dim);
          }

          .auth-free-banner {
            margin: 0;
            padding: 8px 12px;
            background: rgba(46, 204, 113, 0.12);
            border: 1px solid rgba(46, 204, 113, 0.25);
            border-radius: 6px;
            color: #2ecc71;
            font-size: 13px;
            text-align: center;
          }

          .auth-error {
            margin: 0;
            padding: 8px 12px;
            background: rgba(231, 76, 60, 0.15);
            border: 1px solid rgba(231, 76, 60, 0.3);
            border-radius: 6px;
            color: var(--danger);
            font-size: 13px;
          }

          .auth-success {
            margin: 0;
            padding: 8px 12px;
            background: rgba(46, 204, 113, 0.15);
            border: 1px solid rgba(46, 204, 113, 0.3);
            border-radius: 6px;
            color: #2ecc71;
            font-size: 13px;
          }

          .auth-submit {
            padding: 12px;
            background: var(--accent-bg);
            border: 1px solid var(--accent);
            border-radius: 6px;
            color: var(--text-bright);
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.15s;
            margin-top: 4px;
          }

          .auth-submit:hover:not(:disabled) {
            background: var(--accent-hover);
          }

          .auth-submit:disabled {
            opacity: 0.6;
            cursor: not-allowed;
          }

          .auth-footer {
            margin: 16px 0 0;
            text-align: center;
            font-size: 13px;
            color: var(--text-secondary);
          }

          .auth-link {
            background: none;
            border: none;
            color: var(--text-link);
            font-size: 13px;
            cursor: pointer;
            padding: 0;
          }

          .auth-link:hover {
            text-decoration: underline;
          }
        `})]})})}export{R as A};
