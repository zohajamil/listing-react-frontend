
export interface GroceryItem {
    id: string;
    name: string;
    description: string;
    picture: string;
}

export interface AlertProps {
    message: string;
}

export interface AddEditGroceryItemModalProps {
    showModal: boolean;
    handleClose: Function;
    editItem: GroceryItem;
    addItem: Function;
}

export interface TextFieldProps {
    type: string;
    placeholder: string;
    width: string;
    setValue?: Function;
    defaultValue?: string | number;
    additionalClasses?: string;
    fieldName?: string;
    disabled?: boolean;
}


export interface FilePickerProps {
    fileSelected: File;
    setFileSelected: Function;
    isUploading: boolean;
    uploadProgress: number;
    pictureUrl: string;
    name: string;
}
