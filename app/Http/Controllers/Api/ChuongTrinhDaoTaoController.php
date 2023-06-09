<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ChuongTrinhDaoTaoResource;
use App\Http\Resources\CreditsResource;
use App\Http\Resources\ListCTDTResource;
use App\Http\Resources\SectionAHeader_Resource;
use App\Http\Resources\SectionB_Resource;
use App\Models\ChuongTrinhDaoTao;
use App\Service\ChuongTrinhDaoTaoService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;

class ChuongTrinhDaoTaoController extends Controller
{
    protected $ctdt;
    public function __construct(ChuongTrinhDaoTao $ctdt) 
    {
        $this->ctdt=$ctdt;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
       $ctdtService = new ChuongTrinhDaoTaoService();
        $listCTDT = $ctdtService->getList();
        return response()->json([
            'data'=>ListCTDTResource::collection($listCTDT)
        ], HttpResponse::HTTP_OK);
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function storeUpdate(Request $request)
    {
        $ctdtService = new ChuongTrinhDaoTaoService();
        $item = $ctdtService->updateCTDT($request);
        if (empty(json_decode($item))) {
            return response()->json([
                'status' =>HttpResponse::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }
        $itemResource = ChuongTrinhDaoTaoResource::collection($item);
        return response()->json([
            'id'=>intval($request['id']),
            'data'=> $itemResource
        ], HttpResponse::HTTP_OK);
    }
    public function storeCreate(Request $request)//tao mot chuong trinh dao tao moi
    {
        $data = $request->all();
        $ctdt = new ChuongTrinhDaoTao();
        $ctdt->fill($data);
        $ctdt->save();
        return response()->json([
            'id'=>$ctdt->id
        ], HttpResponse::HTTP_OK);
    }

    public function storeMTTQ(Request $request)
    {
        $ctdtService = new ChuongTrinhDaoTaoService();
        $item = $ctdtService->updateMTTQ($request);
        $itemResource = SectionB_Resource::collection($item);
        return response()->json([
            'data'=>$itemResource
        ], HttpResponse::HTTP_OK);
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function showCTDT($id)
    {
        $ctdtService = new ChuongTrinhDaoTaoService();
        $item = $ctdtService->getCTDT($id);
        if (empty(json_decode($item))) {
            return response()->json([
                'status'=>HttpResponse::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }
        $itemResource = ChuongTrinhDaoTaoResource::collection($item);
        return response()->json([
            'id'=>intval($id),
            'data'=> $itemResource
        ], HttpResponse::HTTP_OK);
    }
    
    public function showMTTQ($id)
    {
        $ctdtService = new ChuongTrinhDaoTaoService();
        $item = $ctdtService->getCTDT($id);
        if (empty(json_decode($item))) {
            return response()->json([
                'status'=>HttpResponse::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }
        $itemResource = SectionB_Resource::collection($item);
        return response()->json([
            'data'=> $itemResource
        ], HttpResponse::HTTP_OK);
    }
    public function showHeader($id)
    {
        $ctdtService = new ChuongTrinhDaoTaoService();
        $itemHeader =  $ctdtService->getCTDT($id);
        if (empty(json_decode($itemHeader))) {
            return response()->json([
                'status'=>HttpResponse::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }
        $itemResource =SectionAHeader_Resource::collection($itemHeader);
        return response()->json([
            'id'=>intval($id),
           'data'=> $itemResource
        ], HttpResponse::HTTP_OK);
    }
    public function showCredits($id)
    {
        $ctdtService = new ChuongTrinhDaoTaoService();
        $item =  $ctdtService->getCTDT($id);
        if (empty(json_decode($item))) {
            return response()->json([
                'status'=>HttpResponse::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }
        $itemResource =CreditsResource::collection($item);
        return response()->json([
            'id'=>intval($id),
           'data'=> $itemResource
        ], HttpResponse::HTTP_OK);
    }
    public function storeUpdateCredits(Request $request)
    {
        $data = $request['data'];
        $idChuongTrinh =$request['idCTDT'];
        $ctdtService = new ChuongTrinhDaoTaoService();
        $itemCTDT = $ctdtService->getCTDT($idChuongTrinh);
        if (empty(json_decode($itemCTDT))) {
            return response()->json([
                'status'=>HttpResponse::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }
        foreach($data as $val) {
            $ctdtService->updateCredits($val, $idChuongTrinh);
           }
        $itemUpdate = $ctdtService->getCTDT($idChuongTrinh);
        $itemResource = CreditsResource::collection($itemUpdate);
        return response()->json([
            'idCTDT'=>intval($idChuongTrinh),
            'data'=> $itemResource
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
    public function destroy($id)
    {
        //
    }
}