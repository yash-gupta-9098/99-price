export default function Toast() {
    return (
        
        <div id="ShowMessage" className="Polaris-Frame-ToastManager" style={{bottom:0}}></div>
        
    )
}


export function showToastMessage (content  ,  duration  ) {
    console.log("helloo");    
        const messageWrapper = document.querySelector(".Polaris-Frame-ToastManager");    
        console.log(messageWrapper);
        messageWrapper.innerHTML = `<div
        class="Polaris-Frame-ToastManager__ToastWrapper Polaris-Frame-ToastManager--toastWrapperEnterDone"
        style="
            --pc-toast-manager-translate-y-in: -64px;
            --pc-toast-manager-scale-in: 1;
            --pc-toast-manager-blur-in: 0px;
            --pc-toast-manager-transition-delay-in: 0ms;
            --pc-toast-manager-scale-out: 0.85;
            --pc-toast-manager-translate-y-out: -64px;
        "
    >
        <div>
            <div class="Polaris-Frame-Toast" aria-live="assertive">
                <div class="Polaris-InlineStack" style="--pc-inline-stack-block-align: center; --pc-inline-stack-wrap: wrap; --pc-inline-stack-gap-xs: var(--p-space-400); --pc-inline-stack-flex-direction-xs: row;">
                    <span class="Polaris-Text--root Polaris-Text--medium">${content}</span>
                </div>
                <button type="button" class="Polaris-Frame-Toast__CloseButton">
                    <span class="Polaris-Icon Polaris-Icon--toneInherit">
                        <svg viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true">
                            <path d="M12.72 13.78a.75.75 0 1 0 1.06-1.06l-2.72-2.72 2.72-2.72a.75.75 0 0 0-1.06-1.06l-2.72 2.72-2.72-2.72a.75.75 0 0 0-1.06 1.06l2.72 2.72-2.72 2.72a.75.75 0 1 0 1.06 1.06l2.72-2.72 2.72 2.72Z"></path>
                        </svg>
                    </span>
                </button>
            </div>
        </div>
    </div>
    `
    setTimeout(()=>{
        messageWrapper.innerHTML = "";
    }, duration)
    

}