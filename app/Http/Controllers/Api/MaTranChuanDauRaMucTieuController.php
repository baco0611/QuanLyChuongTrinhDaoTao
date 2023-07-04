<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\MaTranChuanDauRaMucTieuResource;
use App\Models\MatranChuanDauRaMucTieu;
use App\Service\ChuongTrinhDaoTaoService;
use App\Service\MaTranChuanDauRaMucTieuService;
use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;


class MaTranChuanDauRaMucTieuController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        $MaTranService = new MaTranChuanDauRaMucTieuService();
        $listItem = $MaTranService->getList($idChuongTrinh);
        $listMaTran = MaTranChuanDauRaMucTieuResource::collection($listItem);
        if (empty($data)) {
            return response()->json([
                'idCTDT'=>intval($idChuongTrinh),
                'data' => $listMaTran,
                'status'=>HttpResponse::HTTP_OK
            ]);
        }
       foreach($data as $val) {
           $matran = new MatranChuanDauRaMucTieu();
           $matran->idChuongTrinh=$idChuongTrinh;
           $matran->idChuanDauRa=$val['PLO'];
           $matran->idMucTieu=$val['PO'];
           $matran->save();
       }
       return response()->json([
        'idCTDT'=>intval($idChuongTrinh),
        'data' => $listMaTran,
        'status'=>HttpResponse::HTTP_OK
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
        $MaTranService = new MaTranChuanDauRaMucTieuService();
        $ctdt = new ChuongTrinhDaoTaoService();
        $itemCTDT = $ctdt->getCTDT($id);
        $listItem = $MaTranService->getList($id);
        if (empty(json_decode($itemCTDT))) {
            return response()->json([
                'status'=>HttpResponse::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }
        if (!empty(json_decode($itemCTDT)) && empty(json_decode($listItem))) {
            return response()->json([
                'idCTDT'=>intval($id),
                'data' => []
            ]);
        }
        $listMaTran = MaTranChuanDauRaMucTieuResource::collection($listItem);
        return response()->json([
            'idCTDT'=>intval($id),
            'checkData' => $listMaTran,
            'status'=>HttpResponse::HTTP_OK
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
        $MaTranService = new MaTranChuanDauRaMucTieuService();
        if (!empty($data)){
            foreach($data as $val) {
                $MaTranService->delete($val,$idChuongTrinh);
            }
        }
        $listItem = $MaTranService->getList($idChuongTrinh);
        $listMaTran = MaTranChuanDauRaMucTieuResource::collection($listItem);
        return response()->json([
            'idCTDT'=>intval($idChuongTrinh),
            'data' => $listMaTran,
            'status'=>HttpResponse::HTTP_OK
        ], HttpResponse::HTTP_OK);
    }
}