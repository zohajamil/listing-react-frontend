import { Suspense, useEffect, useState } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import { deleteItem, getAllGroceryItems } from "../../apis/services/grocery.service";
import Alert from "../../Common/Alert/Alert";
import { isSuccessCode } from "../../Common/Common";
import { GroceryItem } from "../../Common/Interfaces/Interfaces";
import Loader from "../../Common/Loader/Loader";
import AddEditGroceryItemModal from "../AddEditGroceryItemModal/AddEditGroceryItemModal";


export default function GroceryList() {
  const [groceryItems, setGroceryItems] = useState([] as GroceryItem[]);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState({} as GroceryItem);
  const [isLoading, setIsLoading] = useState(false);
  const [firstId, setFirstId] = useState("");

  const handleClose = () => setShowModal(false);
  const handleShow = (isEdit: boolean, item: GroceryItem) => {
    if (isEdit) {
      setEditItem(item);
    } else {
      setEditItem({
        id: "",
        name: "",
        description: "",
        picture: "",
      } as GroceryItem);
    }
    setShowModal(true);
  };

  const handleDelete=async (id:string)=> {
    setIsLoading(true);
    const res = await deleteItem(id);
    if (res && isSuccessCode(res?.status)) {
      const updated = groceryItems.filter((x)=>x.id!==id);
      setGroceryItems(updated);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getItems();
  }, []);

  const getItems = async (page = 0) => {
    let startAfter = "";
    let endBefore = "";
    if (page === 1) {
      startAfter = groceryItems[groceryItems.length - 1].id ?? "";
    } else if (page === -1) {
      endBefore = groceryItems[0].id ?? "";
    }
    setIsLoading(true);
    const items = await getAllGroceryItems(
      startAfter,
      endBefore
    );
    setGroceryItems(items);
    setIsLoading(false);
    if (
      items.length > 0 &&
      startAfter.length === 0 &&
      endBefore.length === 0
    ) {
      setFirstId(items[0].id || "");
    }
  };

  const addItem = (updatedItem: GroceryItem, isEdit = false) => {
    if (!isEdit) {
      const itemsCopy = [...groceryItems, updatedItem];
      setGroceryItems(itemsCopy);
    } else {
      const updatedItems = groceryItems.map((item: GroceryItem) => {
        if (item.id === editItem.id) {
          return {
            id: editItem.id,
            name: updatedItem.name,
            description: updatedItem.description,
            picture: updatedItem.picture,
          } as GroceryItem;
        } else {
          return item;
        }
      });
      setGroceryItems(updatedItems);
    }
    setShowModal(false);
  };

  const itemsAvailable = (): boolean => {
    if (!groceryItems || (groceryItems && groceryItems.length === 0)) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <>
      <h1 className="purple-color">Grocery Items</h1>
      <div className="company-container container mt-4">
        <Loader active={isLoading}>
            <Row>
              <Col>
                <Button
                  onClick={() => handleShow(false, {} as GroceryItem)}
                  // text={"New Company"}
                  // iconPath={"fab fa fa-plus"}
                  className={"pull-right gray-button"}
                ><span><i className="bi bi-plus-circle-fill"></i>
                </span> New Item</Button>
              </Col>
            </Row>

          {isLoading && (
            <>
              <Skeleton height={50} />
              <Skeleton height={50} />
              <Skeleton height={50} />
            </>
          )}

          {!isLoading && (
            <Row>
              <div className="col-12">
                {!itemsAvailable() && (
                  <Alert message={"No Items Available"} />
                )}

                {groceryItems && groceryItems.length > 0 && (
                  <>
                    <div className="table-responsive">
                      <Table
                        striped
                        bordered
                        hover
                        className="table table-image mt-2 text-center"
                      >
                        <thead>
                          <tr>
                            <th scope="col"></th>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {groceryItems &&
                            groceryItems.map((item: GroceryItem) => {
                              return (
                                <tr className="h-130" key={item.id}>
                                  <td className="w-10">
                                    <Suspense
                                      fallback={<Skeleton height={50} />}
                                    >
                                      <img
                                        src={item.picture}
                                        className="img-fluid img-thumbnail"
                                        alt={item.name}
                                      />
                                    </Suspense>
                                  </td>
                                  <td>{item.name}</td>
                                  <td>{item.description}</td>
                                    <td className="text-center">
                                      <i
                                        className="bi bi-pencil-fill purple-color"
                                        onClick={() =>
                                          handleShow(true, item)
                                        }
                                      ></i>
                                      <i className="bi bi-trash3-fill text-danger"
                                      onClick={() =>
                                        handleDelete(item.id)
                                      }></i>

                                    </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </Table>
                    </div>
                    <Row className="text-center">
                      {groceryItems.length > 0 && groceryItems[0].id === firstId && (
                        <Col>
                          <button className="pag-button pull-right px-3 cursor-default disabled">
                            ⟨
                          </button>
                        </Col>
                      )}
                      {groceryItems.length > 0 && groceryItems[0].id !== firstId && (
                        <Col>
                          <button
                            onClick={() => getItems(-1)}
                            className="pag-button pull-right px-3"
                          >
                            ⟨
                          </button>
                        </Col>
                      )}
                      {groceryItems.length < 5 && (
                        <Col>
                          <button className="pag-button pull-left px-3 cursor-default disabled">
                            ⟩
                          </button>
                        </Col>
                      )}
                      {groceryItems.length === 5 && (
                        <Col>
                          <button
                            onClick={() => getItems(1)}
                            className="pag-button pull-left px-3"
                          >
                            ⟩
                          </button>
                        </Col>
                      )}
                    </Row>
                  </>
                )}
              </div>
            </Row>
          )}
        </Loader>
      </div>

      {showModal && (
        <AddEditGroceryItemModal
          showModal={showModal}
          handleClose={handleClose}
          editItem={editItem}
          addItem={addItem}
        />
      )}
    </>
  );
}
