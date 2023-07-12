<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ChuyenNganhDaoTaoResource;
use App\Models\ChuyenNganhDaoTao;
use App\Service\ChuongTrinhDaoTaoService;
use App\Service\ChuyenNganhDaoTaoService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Response as HttpResponse;

class ChuyenNganhDaoTaoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function storeCreate(Request $request)
    {
        $data = $request['data'];
        $idChuongTrinh = $request['idCTDT'];
        $ctdt = new ChuongTrinhDaoTaoService();
        $itemCTDT = $ctdt->getCTDT($idChuongTrinh);
        if (empty(json_decode($itemCTDT))) {
            return response()->json([
                'status'=>HttpResponse::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }
        foreach($data as $val) {
            $cndt = new ChuyenNganhDaoTao();
            $cndt->tenChuyenNganh = $val;
            $cndt->idChuongTrinh=   intval($idChuongTrinh);
            $cndt->save();
        }
        $CNDTService = new ChuyenNganhDaoTaoService();
        $listItem = $CNDTService->getCNDT($idChuongTrinh);
        $listCNDT = ChuyenNganhDaoTaoResource::collection($listItem);
        return response()->json([
            'idCTDT'=>intval($idChuongTrinh),
            'data' => $listCNDT
        ], HttpResponse::HTTP_OK);
    }
    public function storeUpdate(Request $request)
    {
        $data = $request['data'];
        $idChuongTrinh = $request['idCTDT'];
        $ctdt = new ChuongTrinhDaoTaoService();
        $itemCTDT = $ctdt->getCTDT($idChuongTrinh);
        if (empty(json_decode($itemCTDT))) {
            return response()->json([
                'status'=>HttpResponse::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }
        $CNDTService = new ChuyenNganhDaoTaoService();
        foreach($data as $val) {
           $CNDTService->update($val,$idChuongTrinh);
        }
        $listItem = $CNDTService->getCNDT($idChuongTrinh);
        $listCNDT = ChuyenNganhDaoTaoResource::collection($listItem);
        return response()->json([
            'idCTDT'=>intval($idChuongTrinh),
            'data' => $listCNDT
        ], HttpResponse::HTTP_OK);
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $CNDTService = new ChuyenNganhDaoTaoService();
        $ctdt = new ChuongTrinhDaoTaoService();
        $itemCTDT = $ctdt->getCTDT($id);
        $listItem = $CNDTService->getCNDT($id);
        if (empty(json_decode($itemCTDT))) {
            return response()->json([
                'status'=>HttpResponse::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }
        $listCNDT = ChuyenNganhDaoTaoResource::collection($listItem);
        return response()->json([
            'idCTDT'=>intval($id),
            'data' => $listCNDT
        ], HttpResponse::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $data = $request['deleteData'];
        $idChuongTrinh =$request['idCTDT'];
        $CNDTService = new ChuyenNganhDaoTaoService();
        if (!empty($data)){
            foreach($data as $val) {
                $CNDTService->delete($val,$idChuongTrinh);
            }
        }
        $listItem = $CNDTService->getCNDT($idChuongTrinh);
        $listCNDT = ChuyenNganhDaoTaoResource::collection($listItem);
        return response()->json([
            'idCTDT'=>intval($idChuongTrinh),
            'data' => $listCNDT
        ], HttpResponse::HTTP_OK);
    }
}