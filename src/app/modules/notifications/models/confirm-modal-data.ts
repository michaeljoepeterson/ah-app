/**
 * model data for confirmation modal
 */
export interface ConfirmModalData{
    /**
     * modal message
     */
    message:string;
    /**
     * optional confirmation text
     */
    confirmText?:string;
    /**
     * optional cancel text
     */
    cancelText?:string;
}