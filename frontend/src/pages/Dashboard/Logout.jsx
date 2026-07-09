import React from "react";

export const Logout = ({ onConfirm, onCancel }) => {
  console.log("Logout modal rendered");
    console.log("onCancel:", onCancel);
  console.log("onConfirm:", onConfirm);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-lg p-6 w-80 shadow-lg">
        <h2 className="text-lg font-semibold mb-2">Logout</h2>

        <p className="text-gray-600 mb-6">
          Are you sure you want to logout?
        </p>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            // onClick={()=>{console.log("cancel button clicked");
            //       onCancel();}}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            // onClick={()=>{console.log("logout");}}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};