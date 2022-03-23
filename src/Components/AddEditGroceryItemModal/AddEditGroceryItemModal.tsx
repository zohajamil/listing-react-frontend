import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import Modal from "react-bootstrap/esm/Modal";
import { AddEditGroceryItemModalProps } from "../../Common/Interfaces/Interfaces";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { isSuccessCode } from "../../Common/Common";
import { postItem, updateItem } from "../../apis/services/grocery.service";
import TextField from "../../Common/TextField/TextField";
import FilePicker from "../../Common/FilePicker/FilePicker";
import { storage } from "../../config/firebase.includes";

export default function AddEditGroceryItemModal(props: AddEditGroceryItemModalProps) {
  const [itemId] = useState(props.editItem?.id || "");
  const [itemName, setItemName] = useState(props.editItem?.name || "");
  const [itemDescription, setItemDescription] = useState(
    props.editItem?.description || ""
  );
  const [itemPictureUrl, setItemPictureUrl] = useState(
    props.editItem?.picture || ""
  );
  const [fileSelected, setFileSelected] = useState({} as File);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isEdit] = useState(
    props.editItem &&
      props.editItem?.id &&
      props.editItem?.id.length > 0
      ? true
      : false
  );


  const saveItem = async (url: string) => {
    const item: any = {
      name: itemName,
      description: itemDescription,
      picture: url,
    };
    if (!isEdit) {
      const res = await postItem(item);
      if (res && isSuccessCode(res?.status)) {
        item.id = res.data.id;
        props.addItem(item);
      }
    } else {
      const res = await updateItem(itemId, item);
      if (res && isSuccessCode(res?.status)) {
        props.addItem(item, true);
      }
    }
  };


  const isFileSelected = (): boolean => {
    if (fileSelected && fileSelected.name) {
      return true;
    } else if (itemPictureUrl && itemPictureUrl.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  const isFormValid = () => {
    if (
      itemName &&
      itemName.length > 0 &&
      itemDescription &&
      itemDescription.length > 0 &&
      isFileSelected()
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleSave = () => {
    setIsSubmitted(true);
    if (isFormValid()) {
      if (fileSelected.name) {
        handleUpload();
      } else {
        saveItem(itemPictureUrl);
        props.handleClose();
      }
    }
  };

  const handleUpload = () => {
    setIsUploading(true);
    const storageRef = ref(storage, "items/" + fileSelected.name);
    const uploadTask = uploadBytesResumable(storageRef, fileSelected);

    uploadTask.on(
      "state_changed",
      (snapshot: { bytesTransferred: number; totalBytes: number }) => {
        const progress =
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 1000) /
          10;
        setUploadProgress(progress);
      },
      (error: any) => {
        console.log(error);
      },
      async () => {
        try {
          const url = await getDownloadURL(storageRef);
          setItemPictureUrl(url);
          saveItem(url);
          props.handleClose();
        } catch (error: any) {
          console.log(error);
        }
      }
    );
  };

  return (
    <>
      <Modal
        className="add-edit-item-modal-container"
        show={props.showModal}
        onHide={() => props.handleClose()}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col>
                <label className="fw-bold">Item Name</label>

                <TextField
                  type={"text"}
                  placeholder={""}
                  width={""}
                  setValue={setItemName}
                  defaultValue={itemName}
                  additionalClasses={
                    !itemName && itemName.length === 0 && isSubmitted
                      ? "is-invalid"
                      : ""
                  }
                  fieldName={"Item Name"}
                ></TextField>
              </Col>
            </Row>
            <Row className="my-3">
              <Col>
                <label className="fw-bold">Item Description</label>
                <TextField
                  type={"text"}
                  placeholder={""}
                  width={""}
                  setValue={setItemDescription}
                  defaultValue={itemDescription}
                  additionalClasses={
                    !itemDescription &&
                      itemDescription.length === 0 &&
                      isSubmitted
                      ? "is-invalid"
                      : ""
                  }
                  fieldName={"Item Description"}
                ></TextField>
              </Col>
            </Row>
            <Row>
              <label className="fw-bold">Item Picture</label>

              <FilePicker
                fileSelected={fileSelected}
                setFileSelected={setFileSelected}
                isUploading={isUploading}
                uploadProgress={uploadProgress}
                pictureUrl={itemPictureUrl}
                name={itemName}
              />
              <div
                className={`text-danger ${!itemPictureUrl &&
                  itemPictureUrl.length === 0 &&
                  !fileSelected.name &&
                  isSubmitted
                  ? ""
                  : "d-none"
                  }`}
              >
                <small>Item Picture is required</small>
              </div>
            </Row>
          </Form>


        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={() => props.handleClose()}
            className="gray-button btn"
          >
            Close
          </button>
          <button
            onClick={() => handleSave()}
            className="purple-button btn"
          >
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
