import React from 'react'
import { useState } from 'react'
import "./Liker.css"

const Liker = ({ data, likes }) => {
  const [openLikerModel, setOpenLikerModel] = useState(false);
  const { liker } = data;
  // console.log(liker);
  
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

  const setModel = () => {
    setOpenLikerModel(count=>count^1);
  }

  return (
    <div>
      <span
        style={{ color: "var(--gray)", fontSize: "12px", cursor: "pointer" }}
      >
        <h3 onClick={setModel}>{likes} likes</h3>
      </span>
  
      {openLikerModel ? (
        <div>
          {liker.map((s) => {
            return (
              <div className="Liker">
                <div className="likerContainer">
                  <img
                    src={
                      publicFolder + s.profilePicture
                        ? publicFolder + s.profilePicture
                        : publicFolder + "defaultProfile.png"
                    }
                    alt=""
                    width="40px"
                    height="40px"
                  />

                  <h5>{s.username}</h5>
                </div>
              </div>
            );
          
          })}
          
        </div>
      ) : (
        // liker.map((singleLiker) => {
        //   <div className="Liker">
        //     <div className="likerContainer">
        //       <img
        //         src="https://bobbyhadz.com/images/blog/react-usestate-conditional-initial-value/banner.webp"
        //         alt=""
        //         width="40px"
        //         height="40px"
        //       />
        //       {/* {singleLiker} */}
        //       <h5>abdullah al mamun</h5>
        //     </div>
        //   </div>;
        // })

        ""
      )}
    </div>
  );
}

export default Liker