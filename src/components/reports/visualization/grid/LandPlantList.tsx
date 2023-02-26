import React, { FC, ReactElement, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import "../../../../App.scss";
import * as ReportService from "../../services/LandPlantList";
import { ReportColumnHeader } from "../../input-fields/ColumnHeader";
import * as ReportColumnDisplay from "./columns";
import * as AsyncServices from "../../../services";
import { ReportPagination } from "../../input-fields";

export interface ReportGridLandPlantListProps {
    name: string
    contextCode:string
    sortedColumnName: string
    isSortDescending: boolean
    items: ReportService.QueryResultItem[]
    onSort(columnName: string): void
    onNavigateTo(url: string): void
    onRefreshRequest(): void
    currentPage: number  
    totalItemCount: number
    pageSize: number 
    onPageSizeChange(pageSize:number): void
    onPageSelection(pageNumber:number): void
}
export const ReportGridLandPlantList: FC<ReportGridLandPlantListProps> = ({ 
    name,
    contextCode,
    sortedColumnName,
    isSortDescending,
    items,
    onSort,
    onNavigateTo,
    onRefreshRequest,
    currentPage,
    totalItemCount,
    pageSize,
    onPageSizeChange,
    onPageSelection,
}): ReactElement => {

    const initialCheckedIndexes: string[] = [];
    const [checkedIndexes, setCheckedIndexes] = useState(initialCheckedIndexes); 

    const handleRowSelectCheckboxChange = (
        e: React.ChangeEvent<HTMLInputElement>, index: number, rowCode: string) => { 
        if (e.target.checked) { 
            checkedIndexes.push(index.toString()); 
            const newList = checkedIndexes.filter(item => item) 
            setCheckedIndexes(newList);
        } else {  
            const newList = checkedIndexes.filter(item => item !== index.toString())
            setCheckedIndexes(newList);
        }
    };

    const onSelectAllRows = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setCheckedIndexes(items.map((item: ReportService.QueryResultItem, index) => index.toString()));
        } else {
            setCheckedIndexes(initialCheckedIndexes);
        }
    };

    const updateLinkPlantCodeColumnButtonClick = (code: string) => {
        onNavigateTo("/plant-edit/" + code);
    }

    const deleteAsyncButtonLinkPlantCodeColumnButtonClick = (code: string) => {
        const data:any = {};
        AsyncServices.PlantUserDeleteSubmitRequest(data,code)
            .then((response) => onRefreshRequest())
    }

    const detailsLinkPlantCodeColumnButtonClick = (code: string) => {
        onNavigateTo("/plant-user-details/" + code);
    }

    const onMultSelectButtonToEditableClick = () => {

        const selectedCodes = items.map((item: ReportService.QueryResultItem, index) => {
            if (checkedIndexes.includes(index.toString())) { return item.plantCode }
        });

        const plantCodeListCsv = selectedCodes.join(',');

        const data:any = {plantCodeListCsv}; 

        AsyncServices.LandUserPlantMultiSelectToEditableSubmit(data, contextCode)
        .then((response) => onRefreshRequest()) 

    }

    const onMultSelectButtonToNotEditableClick = () => {

        const selectedCodes = items.map((item: ReportService.QueryResultItem, index) => {
            if (checkedIndexes.includes(index.toString())) { return item.plantCode }
        });

        const plantCodeListCsv = selectedCodes.join(',');

        const data:any = {plantCodeListCsv}; 

        AsyncServices.LandUserPlantMultiSelectToNotEditableSubmit(data, contextCode)
        .then((response) => onRefreshRequest()) 

    }

    return (
        <div
            data-testid={name}
            className="plants-list-button-body mt-3">


            <div className="w-100" style={{ textAlign: "left" }}>
                <Button id="multSelectButtonToEditable" data-testidid="multSelectButtonToEditable"
                    onClick={() => onMultSelectButtonToEditableClick()}
                    className='primary-button mb-3 me-2' type="button">
                    To Editable
                </Button>
                <Button id="multSelectButtonToNotEditable" data-testidid="multSelectButtonToNotEditable"
                    onClick={() => onMultSelectButtonToNotEditableClick()}
                    className='primary-button mb-3 me-2' type="button">
                    To Not Editable
                </Button>
            </div>

            <Table
                className="plants-list-table"
                striped
                bordered
                hover
                responsive
                size="xl"
            >
                <thead>
                    <tr>
                        <th id="plantCodeColumnHeader"> <Form.Check  
                            type="checkbox"
                            id="plantCode-select-all-rows-checkbox"
                            name="plantCode-select-all-rows-checkbox"
                            onChange={(e) => onSelectAllRows(e)}
                        /></th>
                        
                        <ReportColumnHeader forColumn="someIntVal" 
                            isSortDescending={isSortDescending}
                            label="some Int Val"
                            onSort={onSort}
                            sortedColumnName={sortedColumnName}
                        />

                        <ReportColumnHeader forColumn="someBigIntVal"
                            isSortDescending={isSortDescending}
                            label="some Big Int Val"
                            onSort={onSort}
                            sortedColumnName={sortedColumnName} 
                        />

                        <ReportColumnHeader forColumn="someBitVal"
                            isSortDescending={isSortDescending}
                            label="some Bit Val"
                            onSort={onSort}
                            sortedColumnName={sortedColumnName} 
                        />

                        <ReportColumnHeader forColumn="isEditAllowed"
                            isSortDescending={isSortDescending}
                            label="is Edit Allowed"
                            onSort={onSort}
                            sortedColumnName={sortedColumnName} 
                        />

                        <ReportColumnHeader forColumn="isDeleteAllowed"
                            isSortDescending={isSortDescending}
                            label="is Delete Allowed"
                            onSort={onSort}
                            sortedColumnName={sortedColumnName} 
                        />

                        <ReportColumnHeader forColumn="someFloatVal"
                            isSortDescending={isSortDescending}
                            label="some Float Val"
                            onSort={onSort}
                            sortedColumnName={sortedColumnName} 
                        />

                        <ReportColumnHeader forColumn="someDecimalVal"
                            isSortDescending={isSortDescending}
                            label="some Decimal Val"
                            onSort={onSort}
                            sortedColumnName={sortedColumnName} 
                        />

                        <ReportColumnHeader forColumn="someUTCDateTimeVal"
                            isSortDescending={isSortDescending}
                            label="some UTC Date Time Val"
                            onSort={onSort}
                            sortedColumnName={sortedColumnName} 
                        />

                        <ReportColumnHeader forColumn="someDateVal"
                            isSortDescending={isSortDescending}
                            label="some Date Val"
                            onSort={onSort}
                            sortedColumnName={sortedColumnName} 
                        />

                        <ReportColumnHeader forColumn="someMoneyVal"
                            isSortDescending={isSortDescending}
                            label="some Money Val"
                            onSort={onSort}
                            sortedColumnName={sortedColumnName} 
                        />

                        <ReportColumnHeader forColumn="someNVarCharVal"
                            isSortDescending={isSortDescending}
                            label="some NVar Char Val"
                            onSort={onSort}
                            sortedColumnName={sortedColumnName} 
                        />

                        <ReportColumnHeader forColumn="someVarCharVal"
                            isSortDescending={isSortDescending}
                            label="some Var Char Val"
                            onSort={onSort}
                            sortedColumnName={sortedColumnName} 
                        />

                        <ReportColumnHeader forColumn="someTextVal"
                            isSortDescending={isSortDescending}
                            label="some Text Val"
                            onSort={onSort}
                            sortedColumnName={sortedColumnName} 
                        />

                        <ReportColumnHeader forColumn="somePhoneNumber"
                            isSortDescending={isSortDescending}
                            label="some Phone Number"
                            onSort={onSort}
                            sortedColumnName={sortedColumnName} 
                        />

                        <ReportColumnHeader forColumn="someEmailAddress"
                            isSortDescending={isSortDescending}
                            label="some Email Address"
                            onSort={onSort}
                            sortedColumnName={sortedColumnName} 
                        />

                        <ReportColumnHeader forColumn="flavorName"
                            isSortDescending={isSortDescending}
                            label="flavor Name"
                            onSort={onSort}
                            sortedColumnName={sortedColumnName} 
                        />

                        <ReportColumnHeader forColumn="flavorCode"
                            isSortDescending={isSortDescending}
                            label="flavor Code"
                            onSort={onSort}
                            sortedColumnName={sortedColumnName} 
                        />

                        <ReportColumnHeader forColumn="SomeIntConditionalOnDeletable"
                            isSortDescending={isSortDescending}
                            label="Int Conditional On Deleteable"
                            onSort={onSort}
                            sortedColumnName={sortedColumnName} 
                        />
                        
                        <ReportColumnHeader forColumn="updateLinkPlantCode"
                            isSortDescending={isSortDescending}
                            label=""
                            onSort={onSort}
                            sortedColumnName={sortedColumnName} 
                            isVisible={false}
                        />

                        <ReportColumnHeader forColumn="deleteAsyncButtonLinkPlantCode"
                            isSortDescending={isSortDescending}
                            label=""
                            onSort={onSort}
                            sortedColumnName={sortedColumnName} 
                        />

                        <ReportColumnHeader forColumn="detailsLinkPlantCode"
                            isSortDescending={isSortDescending}
                            label=""
                            onSort={onSort}
                            sortedColumnName={sortedColumnName} 
                        />
 
                    </tr>
                </thead>
                <tbody>
                    {items && items.length
                        ? items.map((item: ReportService.QueryResultItem, index) => {
                            return (
                                <tr key={index.toString()}>
                                    <td data-testid={'plantCodeColumn-' + index}>
                                        <Form.Check
                                            type="checkbox"
                                            id={'row-select-' + index}
                                            name={"row-select-" + index}
                                            checked={checkedIndexes.includes(index.toString())}
                                            onChange={(e) => { handleRowSelectCheckboxChange(e, index, item.plantCode) }}
                                        />
                                    </td>
                                    <ReportColumnDisplay.ReportColumnDisplayNumber forColumn="someIntVal"
                                        rowIndex={index}
                                        value={item.someIntVal}
                                    />
                                    <ReportColumnDisplay.ReportColumnDisplayNumber forColumn="someBigIntVal"
                                        rowIndex={index}
                                        value={item.someBigIntVal}
                                    />
                                    <ReportColumnDisplay.ReportColumnDisplayCheckbox forColumn="someBitVal"
                                        rowIndex={index}
                                        isChecked={item.someBitVal}
                                    />
                                    <ReportColumnDisplay.ReportColumnDisplayCheckbox forColumn="isEditAllowed"
                                        rowIndex={index}
                                        isChecked={item.isEditAllowed}
                                    />

                                    <ReportColumnDisplay.ReportColumnDisplayCheckbox forColumn="isDeleteAllowed"
                                        rowIndex={index}
                                        isChecked={item.isDeleteAllowed}
                                    />
                                    <ReportColumnDisplay.ReportColumnDisplayNumber forColumn="someFloatVal"
                                        rowIndex={index}
                                        value={item.someFloatVal}
                                    />

                                    <ReportColumnDisplay.ReportColumnDisplayNumber forColumn="someDecimalVal"
                                        rowIndex={index}
                                        value={item.someDecimalVal}
                                    />
                                    <ReportColumnDisplay.ReportColumnDisplayDateTime forColumn="someUTCDateTimeVal"
                                        rowIndex={index}
                                        value={item.someUTCDateTimeVal}
                                    />
                                    <ReportColumnDisplay.ReportColumnDisplayDate forColumn="someDateVal"
                                        rowIndex={index}
                                        value={item.someDateVal}
                                    />
                                    <ReportColumnDisplay.ReportColumnDisplayMoney forColumn="someMoneyVal"
                                        rowIndex={index}
                                        value={item.someMoneyVal}
                                    />
                                    <ReportColumnDisplay.ReportColumnDisplayText forColumn="someNVarCharVal"
                                        rowIndex={index}
                                        value={item.someNVarCharVal}
                                    />
                                    <ReportColumnDisplay.ReportColumnDisplayText forColumn="someVarCharVal"
                                        rowIndex={index}
                                        value={item.someVarCharVal}
                                    />
                                    <ReportColumnDisplay.ReportColumnDisplayText forColumn="someTextVal"
                                        rowIndex={index}
                                        value={item.someTextVal}
                                    />
                                    <ReportColumnDisplay.ReportColumnDisplayPhoneNumber forColumn="somePhoneNumber"
                                        rowIndex={index}
                                        value={item.somePhoneNumber}
                                    />

                                    <ReportColumnDisplay.ReportColumnDisplayEmail forColumn="someEmailAddress"
                                        rowIndex={index}
                                        value={item.someEmailAddress}
                                    />
                                    <ReportColumnDisplay.ReportColumnDisplayText forColumn="flavorName"
                                        rowIndex={index}
                                        value={item.flavorName}
                                    />
                                    <ReportColumnDisplay.ReportColumnDisplayText forColumn="flavorCode"
                                        rowIndex={index}
                                        value={item.flavorCode}
                                    />
                                    <ReportColumnDisplay.ReportColumnDisplayNumber forColumn="SomeIntConditionalOnDeletable"
                                        rowIndex={index}
                                        value={item.someIntVal}
                                        isVisible={item.isDeleteAllowed}
                                    /> 
                                    
                                    <ReportColumnDisplay.ReportColumnDisplayButton forColumn="updateLinkPlantCode"
                                        rowIndex={index}
                                        value={item.updateLinkPlantCode} 
                                        buttonText="Delete Async"
                                        onClick={() => updateLinkPlantCodeColumnButtonClick(item.updateLinkPlantCode)}
                                        isVisible={false}
                                    /> 
                                    
                                    <ReportColumnDisplay.ReportColumnDisplayButton forColumn="deleteAsyncButtonLinkPlantCode"
                                        rowIndex={index}
                                        value={item.deleteAsyncButtonLinkPlantCode} 
                                        buttonText="Delete Async"
                                        onClick={() => deleteAsyncButtonLinkPlantCodeColumnButtonClick(item.deleteAsyncButtonLinkPlantCode)}
                                    /> 
                                    
                                    <ReportColumnDisplay.ReportColumnDisplayButton forColumn="detailsLinkPlantCode"
                                        rowIndex={index}
                                        value={item.detailsLinkPlantCode} 
                                        buttonText="Details"
                                        onClick={() => detailsLinkPlantCodeColumnButtonClick(item.detailsLinkPlantCode)}
                                    /> 

                                </tr>
                            );
                        })
                        :
                        <tr><td colSpan={4}>No rows returned text</td></tr>}
                </tbody>
            </Table>
 
            <ReportPagination
                name="reportGridLandPlantList-paginator"
                currentPage={currentPage}
                currentPageItemCount={items.length}
                onPageSelection={onPageSelection}
                onPageSizeChange={onPageSizeChange}
                pageSize={pageSize}
                totalItemCount={totalItemCount}
            />
        </div>
    );
}; 
